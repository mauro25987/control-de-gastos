import { Link, Outlet } from 'react-router'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cyan-800">
      <Link to={'/control-de-gastos/'} className="pb-7 text-5xl font-semibold">
        App Control de Gastos
      </Link>
      <Outlet />
    </div>
  )
}
