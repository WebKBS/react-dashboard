import { createFileRoute } from "@tanstack/react-router";
import Container from "@/components/layout/Container.tsx";

export const Route = createFileRoute("/_authenticated/about/")({
  component: AboutPage,
});

function AboutPage() {
  return <Container>About Page</Container>;
}
