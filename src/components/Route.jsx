import { useAuthState } from "../context/AuthContext";

export const Route = ({pathName, children}) => {
    return window.location.pathname === pathName ? children : null;
}

export const AuthRoute = ({pathName, redirect='/login', children}) => {
    const auth = useAuthState()
    if(auth.data.session) return window.location.pathname === pathName ? children : null
    if(window.location.pathname === pathName && window.location.pathname !== redirect) return window.location.pathname = redirect
}

export const GuestRoute = ({pathName, redirect='/profile', children}) => {
    const auth = useAuthState()
    if(!auth.data.session) return window.location.pathname === pathName ? children : null
    if(window.location.pathname === pathName && window.location.pathname !== redirect) return window.location.pathname = redirect
}