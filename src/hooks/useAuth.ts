export const useAuth = () => {
  const signIn = () => {
    localStorage.setItem("isAuthenticated", "true");
  };

  const signOut = () => {
    localStorage.removeItem("isAuthenticated");
  };

  const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
  };

  return {
    signIn,
    signOut,
    isAuthenticated,
  };
};

export type AuthContext = ReturnType<typeof useAuth>;
