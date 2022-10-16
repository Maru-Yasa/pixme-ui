import { createContext, useContext, useReducer } from "react";
import { AuthReducer, initialValue } from "./reducer";

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()


export const AuthProvider = ({children}) => {
    const [user, dispatch] = useReducer(AuthReducer, initialValue)

    return <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
            {children}
        </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
}

export const useAuthState = () => {
    const ctx = useContext(AuthStateContext)
    if(ctx === undefined) throw new Error('useAuthState must be used with AuthProvider')
    return ctx
}

export const useAuthDispatch = () => {
    const ctx = useContext(AuthDispatchContext)
    if(ctx === undefined) throw new Error('useAuthState must be used with AuthProvider')
    return ctx
}
