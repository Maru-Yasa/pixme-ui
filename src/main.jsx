import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthRoute, GuestRoute, Route } from './components/Route'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import { Index } from './pages/Index'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Google } from './pages/Google'
import { Form } from './pages/Form'
import { Success } from './pages/Success'
import { DetailMessage } from './pages/DetailMessage'
import { EditProfile } from './pages/EditProfile'
import { ResetPassword } from './pages/ResetPassword'
import { ForgotPassword } from './pages/ForgotPassword'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Route pathName={'/'}>
        <Index />
      </Route>
      <Route pathName={'/form'}>
        <Form />
      </Route>
      <Route pathName={'/success'}>
        <Success />
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
      <AuthRoute pathName={'/edit-profile'} redirect={'/login'}>
        <EditProfile />
      </AuthRoute>
      <Route pathName={'/reset-password'}>
        <ResetPassword />
      </Route>
      <Route pathName={'/forgot-password'}>
        <ForgotPassword />
      </Route>
      <AuthRoute pathName={'/message'} redirect={'/login'}>
        <DetailMessage />
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
