import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContext } from "@/hooks/useAuth.ts";

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <main className="w-full h-full">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
