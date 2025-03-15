import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components'
import { Home, Wallet } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/wallet/:id', element: <Wallet /> },
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
