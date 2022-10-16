import { useEffect, useState } from "react"
import { getMessagaes, logout, me } from "../api/Api"
import { Board, Button, Spinner } from "../components/Components"
import { Message } from "../components/Message"
import { useAuthDispatch, useAuthState } from "../context/AuthContext"

export const Profile = () => {
    const auth = useAuthState()
    const dispatch = useAuthDispatch()

    const [messages, setMessages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getMessagaes().then((data) => {
            setMessages(data)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        if(messages !== null){
            setIsLoading(false)
            console.log(messages);
        }
    }, [messages])

    const handleLogout = (e) => {
        e.preventDefault()
        logout(dispatch)
    }

    return <>
        <div className="flex flex-col justify-center">
            <Board className={'flex flex-col bg-white'}>
                <h1 className="text-3xl">Hello, {auth.profile.username}</h1>
                <div className="flex gap-1 justify-center">
                    <Button className={'bg-yellow-300'}>Edit Profile</Button>
                    <Button className={'bg-green-400'}>Copy link</Button>
                    <Button className={'bg-red-500'} onClick={handleLogout}>Logout</Button>
                </div>
            </Board>

            <div className="mt-3">
                {isLoading ? <>
                    <Spinner />
                </> : <>
                    <div className="grid grid-cols-12 mt-3">
                        {messages && messages.map((data) => {
                            return <Message className="md:col-span-3 col-span-6" key={data.id} data={data} />
                        })}
                    </div>
                </>}
            </div>

        </div>
    </>
}