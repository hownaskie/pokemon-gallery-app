import { createFileRoute, redirect } from '@tanstack/react-router'
import { GoogleLogin } from '@/components/GoogleLogin'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (context?.auth) {
      throw redirect({ to: '/dashboard' })
    }
  },
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>
        <GoogleLogin />
      </div>
    </div>
  )
}
