import { Outlet } from 'react-router'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>App Control de Gastos</h1>
      <Outlet />
    </div>
  )
}
