import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  // 사용자가 로그인되어 있으면 대시보드로 리디렉션합니다.

  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.authentication;

    if (await isAuthenticated()) {
      throw redirect({
        to: "/dashboard",
      });
    }else {
      throw redirect({
        to: "/login",
      });
    }
  },
});

