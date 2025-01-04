import axios from "axios";
import { RefreshResponse, tokenStorage } from "@/lib/storage.ts";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: (import.meta.env.API_URL as string) || "http://localhost:4000",
  withCredentials: true,
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    try {
      const tokens = tokenStorage.getTokens();
      if (tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      return config;
    } catch (error) {
      console.error("요청 인터셉터 오류:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 토큰 갱신 중 여부를 저장하는 변수
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 후 호출될 콜백 함수 등록
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// 갱신된 토큰을 모든 대기 중인 요청에 전달
function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response, // 응답 성공 시 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 오류 처리: 액세스 토큰 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 대기
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest)); // 원래 요청 다시 실행
          });
        });
      }

      originalRequest._retry = true; // 중복 실행 방지 플래그 설정
      isRefreshing = true; // 갱신 중 상태 설정

      try {
        const tokens = tokenStorage.getTokens();

        // 토큰 갱신 요청
        const response = await api.post<RefreshResponse>("/api/auth/refresh", {
          refreshToken: tokens?.refreshToken,
        });

        const newTokens = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };

        // 새로운 토큰 저장
        tokenStorage.setTokens(newTokens);

        // 갱신된 토큰을 대기 중인 요청에 전달
        onTokenRefreshed(newTokens.accessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료되었거나 갱신 실패 시
        console.error("토큰 갱신 실패:", refreshError);

        // 저장된 토큰 제거
        tokenStorage.clearTokens();

        // 로그인 페이지로 이동
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // 갱신 상태 초기화
        refreshSubscribers = []; // 대기 중인 요청 초기화
      }
    }

    // 기타 에러는 그대로 반환
    return Promise.reject(error);
  },
);
