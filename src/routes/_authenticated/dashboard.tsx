import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import AppSideBar from "@/components/navigation/AppSideBar.tsx";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashBoardLayout,
});

function DashBoardLayout() {
  return (
    <>
      {/* option = {defaultOpen: boolean} {open: boolean} {onOpenChange: (open: boolean) => void} */}
      <SidebarProvider defaultOpen={false}>
        <AppSideBar />
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </>
  );
}
