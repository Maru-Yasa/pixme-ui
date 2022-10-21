import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMessagaes, logout, me } from "../api/Api"
import { Anchor, Board, Button, Spinner } from "../components/Components"
import { Message } from "../components/Message"
import { useAuthDispatch, useAuthState } from "../context/AuthContext"

export const Profile = () => {
    const auth = useAuthState()
    const dispatch = useAuthDispatch()

    const [messages, setMessages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log(auth.data.user.id);
        getMessagaes(auth.data.user.id).then((data) => {
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
        <div className="flex flex-col justify-center mb-10 p-10">
            <Board className={'flex flex-col bg-white'}>
                <h1 className="text-3xl">Hello, {auth.profile.username}</h1>
                <div className="flex gap-1 justify-center">
                    <Button className={'bg-yellow-300'}>Edit Profile</Button>
                    <Anchor href={`/form?user=${auth.data.user.id}`} className="bg-yellow-200">Your form</Anchor>
                    <Button className={'bg-green-400'}>Copy link</Button>
                    <Button className={'bg-red-500'} onClick={handleLogout}>Logout</Button>
                </div>
            </Board>

            <div className="mt-3">
                {isLoading ? <>
                    <Spinner />
                </> : <>
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-3 content-center gap-5">
                        {messages && messages.map((data) => {
                            return <Message className="" key={data.id} data={data} />
                        })}
                    </div>
                </>}
            </div>

        </div>
    </>
}