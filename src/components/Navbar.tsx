import { Link } from 'react-router'

export function Navbar() {
  return (
    <nav className="bg-slate-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to={'/control-de-gastos/'}>
          <h1 className="text-lg font-bold md:text-2xl">APP Control de Gastos</h1>
        </Link>
        <ul className="flex gap-x-1 text-lg font-semibold md:gap-x-4">
          <li>
            <Link to={'/control-de-gastos/'} className="text-slate-400 hover:text-slate-200">
              Home
            </Link>
          </li>
          <li>
            <Link to={'/control-de-gastos/'} className="text-slate-400 hover:text-slate-200">
              Transferencias
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
