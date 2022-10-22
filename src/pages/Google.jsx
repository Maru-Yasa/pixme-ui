import { useEffect, useState } from "react"
import { postAuth } from "../api/Api"
import { supabase } from "../api/supabase"
import { Anchor, Button } from "../components/Components"
import { useAuthDispatch } from "../context/AuthContext"

export const Google = () => {
    const dispatch = useAuthDispatch()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // postAuth(dispatch).then((data) => {
        //     setUser(data)
        // }).catch((err) => {
        //     console.log(err);
        // })
    }, [])

    useEffect(() => {
        if(user){
            window.location.pathname = '/profile'
        }
    }, [user])

    return <>
        <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-center">This method currently disabled due to many bug reports</h1>
            <div className="flex">
                <Anchor href={'/login'} className={'bg-red-500 shadow-xl hover:shadow-md mt-5'}>Go back</Anchor>
            </div>
        </div>
    </>
}