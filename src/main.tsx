import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './pages/main/main-page'
import ConfigPage from './pages/config-page/config-page'
import './styles.css'
import Top from './pages/main/components/top-panel/top-panel'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Top />,
    children: [
      {
        path: '/config',
        element: <ConfigPage />,
      },
      {
        path: '/app',
        element: <App />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
