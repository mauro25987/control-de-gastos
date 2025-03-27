import { Outlet } from 'react-router'
import { Navbar } from './index'

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  )
}
