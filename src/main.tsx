import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './pages/main/main-page'
import ConfigPage from './pages/config-page/config-page'
import './styles.css'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/config',
    element: <ConfigPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
