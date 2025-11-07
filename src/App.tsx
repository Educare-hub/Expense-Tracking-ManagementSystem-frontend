
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Error from './components/Error'
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import LandingPage from './Pages/LandingPage'
import { AboutPage } from './Pages/AboutPage'
import { Verification } from './components/auth/Verification'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/verify',
      element: <Verification />
    },
    {
      path: '*',
      element: <Error />
    }

  ])
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
