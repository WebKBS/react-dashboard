import { createFileRoute } from "@tanstack/react-router";
import Container from "@/components/layout/Container.tsx";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Container>Dashboard</Container>;
}
