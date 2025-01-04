import { tokenStorage } from "@/lib/storage.ts";
import { api } from "@/service/auth/axios.ts";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const useAuth = () => {
  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    let response;

    try {
      response = await api.post<AuthResponse>("/auth/signin", {
        email,
        password,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    tokenStorage.setTokens({
      accessToken: response?.data.accessToken,
      refreshToken: response?.data.refreshToken,
    });

    return response.data;
  };

  const signOut = async () => {
    try {
      const tokens = tokenStorage.getTokens();
      if (tokens?.refreshToken) {
        // 서버에 로그아웃 알림
        await api.post("/auth/signout", {
          refreshToken: tokens.refreshToken,
        });
      }
    } finally {
      tokenStorage.clearTokens();
    }
  };

  const isAuthenticated = async (): Promise<boolean | null> => {
    const tokens = tokenStorage.getTokens();

    if (!tokens?.accessToken) {
      return false;
    }

    try {
      await api.get("/auth/verify");
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    signIn,
    signOut,
    isAuthenticated,
  };
};

export type AuthContext = ReturnType<typeof useAuth>;
