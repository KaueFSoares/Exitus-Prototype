//HOOKS
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// PAGES
import App from './App'
import Home from './pages/home/Home'
import LogsPage from './pages/logs page/LogsPage'
import RegisterPage from './pages/register/RegisterPage'

//STYLES
import "./styles/main.sass"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/logspage",
        element: <LogsPage />
      },
      {
        path: "registerpage",
        element: <RegisterPage />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
