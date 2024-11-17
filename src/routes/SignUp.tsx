import { createFileRoute } from "@tanstack/react-router";
import SignUpForm from "@/components/form/SignUpForm.tsx";

export const Route = createFileRoute("/SignUp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpForm />;
}
