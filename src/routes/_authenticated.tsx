import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import AppSideBar from "@/components/navigation/AppSideBar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/useAuth.ts";

// 이 컴포넌트는 인증된 사용자만 볼 수 있습니다.
// 인증되지 않은 사용자는 /login으로 리디렉션됩니다.
// 보호된 폴더는 /routes/_authenticated/에 있습니다.

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.authentication;
    if (!(await isAuthenticated())) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <>
      {/* option = {defaultOpen: boolean} {open: boolean} {onOpenChange: (open: boolean) => void} */}
      <SidebarProvider defaultOpen={true} className="flex-1">
        <AppSideBar />
        <div className="w-full">
          <header className="flex items-center gap-2 py-2 px-4">
            <SidebarTrigger />
            <div className="flex-1 flex justify-between gap-2 items-center">
              <p>Header</p>
              <Button
                onClick={async () => {
                  const { signOut } = useAuth();
                  await signOut();

                  window.location.href = "/";
                }}
              >
                로그아웃
              </Button>
            </div>
          </header>
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  );
}
