import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "@/components/form/SignInForm.tsx";

export const Route = createFileRoute("/")({
  // 사용자가 로그인되어 있으면 대시보드로 리디렉션합니다.

  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.authentication;

    console.log(await isAuthenticated());

    if (await isAuthenticated()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },

  component: Index,
});

function Index() {
  return (
    <div className="w-full h-full">
      <SignIn />
    </div>
  );
}
