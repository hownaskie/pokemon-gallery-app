import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContextType } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: RootRoute,
})

function RootRoute() {
  const location = useLocation()
  const isLogin = location.pathname.startsWith('/login')

  return (
    <>
      {!isLogin && <Header />}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
