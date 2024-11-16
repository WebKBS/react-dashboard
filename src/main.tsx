import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// 생성된 경로 트리 가져오기
import { routeTree } from "./routeTree.gen";
import { useAuth } from "@/hooks/useAuth.ts";

// 새 라우터 인스턴스 만들기
const router = createRouter({
  routeTree,
  context: { authentication: undefined },
});

// 유형 안전성을 위해 라우터 인스턴스 등록
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  const authentication = useAuth();

  root.render(
    <StrictMode>
      <RouterProvider router={router} context={{ authentication }} />
    </StrictMode>,
  );
}
