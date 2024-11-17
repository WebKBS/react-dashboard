import axios from "axios";
import { RefreshResponse, tokenStorage } from "@/lib/storage.ts";

export const api = axios.create({
  baseURL: (import.meta.env.API_URL as string) || "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const tokens = tokenStorage.getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료 에러인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 대기
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = tokenStorage.getTokens();
        if (!tokens?.refreshToken) {
          throw new Error("refresh token이 없습니다.");
        }

        // 토큰 갱신 요청
        const response = await axios.post<RefreshResponse>(
          "/api/auth/refresh",
          {
            refreshToken: tokens.refreshToken,
          },
        );

        const newTokens = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };

        tokenStorage.setTokens(newTokens);
        onTokenRefreshed(newTokens.accessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        tokenStorage.clearTokens();

        // 로그인 페이지로 이동
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
