import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components'
import { Home, Wallet } from './pages'

const router = createBrowserRouter([
  {
    path: '/control-de-gastos/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/control-de-gastos/wallet/:id', element: <Wallet /> },
    ],
  },
  {
    path: '*',
    element: <div>Error 404</div>,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
