import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/about/')({
  component: AboutPage,
})

function AboutPage() {
  return 'Hello /about/!'
}
