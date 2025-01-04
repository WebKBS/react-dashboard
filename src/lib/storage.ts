export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// 토큰 저장소
export const tokenStorage = {
  getTokens(): Tokens | null {
    const tokens = localStorage.getItem("tokens");
    return tokens ? JSON.parse(tokens) : null;
  },

  setTokens(tokens: Tokens) {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  },

  clearTokens() {
    localStorage.removeItem("tokens");
  },
};
