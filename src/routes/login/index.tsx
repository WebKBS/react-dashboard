import { createFileRoute } from '@tanstack/react-router'
import SignIn from "@/components/form/SignInForm.tsx";

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="w-full h-full">
    <SignIn/>
  </div>
}
