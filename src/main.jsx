import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthRoute, GuestRoute, Route } from './components/Route'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import { Index } from './pages/Index'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Google } from './pages/Google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Route pathName={'/'}>
        <Index />
      </Route>
      <GuestRoute pathName={'/login'}>
        <Login />
      </GuestRoute>
      <GuestRoute pathName={'/register'}>
        <Register />
      </GuestRoute>
      <AuthRoute pathName={'/profile'} redirect={'/login'}>
        <Profile />
      </AuthRoute>
      <GuestRoute pathName={'/google'}>
        <Google />
      </GuestRoute>

      <div className="flex w-full gap-1 text-center justify-center mt-3 mb-3">
        Created with 🧠 by <a href="" className='underline'>Maru</a>
      </div>

    </AuthProvider>
  </React.StrictMode>
)
