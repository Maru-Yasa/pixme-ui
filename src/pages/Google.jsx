import { useEffect, useState } from "react"
import { postAuth } from "../api/Api"
import { supabase } from "../api/supabase"
import { useAuthDispatch } from "../context/AuthContext"

export const Google = () => {
    const dispatch = useAuthDispatch()
    const [user, setUser] = useState(null)

    useEffect(() => {
        postAuth(dispatch).then((data) => {
            setUser(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        if(user){
            window.location.pathname = '/profile'
        }
    }, [user])

    return <>
        <h1 className="text-center">Pleas wait ...</h1>
    </>
}