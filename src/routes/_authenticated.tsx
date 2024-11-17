import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import AppSideBar from "@/components/navigation/AppSideBar.tsx";

// 이 컴포넌트는 인증된 사용자만 볼 수 있습니다.
// 인증되지 않은 사용자는 /login으로 리디렉션됩니다.
// 보호된 폴더는 /routes/_authenticated/에 있습니다.

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.authentication;
    if (!isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },

  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <>
      {/* option = {defaultOpen: boolean} {open: boolean} {onOpenChange: (open: boolean) => void} */}
      <SidebarProvider defaultOpen={true}>
        <AppSideBar />
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </>
  );
}
