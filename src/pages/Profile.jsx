import { useCallback, useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { useNavigate } from "react-router-dom"
import { getMessagaes, logout, me } from "../api/Api"
import { validateEmail } from "../api/helpers"
import { intializeHotJar } from "../api/hotjar"
import { Anchor, Board, Button, Spinner } from "../components/Components"
import { Message } from "../components/Message"
import { useAuthDispatch, useAuthState } from "../context/AuthContext"

export const Profile = () => {
    const auth = useAuthState()
    const dispatch = useAuthDispatch()

    const [messages, setMessages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isCopied, setIsCopied] = useState(false)

    const handleDeleteCallback = useCallback(() => {
        handleGetMessage()
    }, [])

    const handleGetMessage = () => {
        console.log('reset');
        getMessagaes(auth.data.user.id).then((data) => {
            setMessages(data)
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        handleGetMessage()
        intializeHotJar()
    }, [])

    useEffect(() => {
        if(messages !== null){
            setIsLoading(false)
        }
    }, [messages])

    const handleLogout = (e) => {
        e.preventDefault()
        logout(dispatch)
    }

    return <>

        {auth.profile ? <>
            <div className="flex flex-col justify-center mb-10 p-10">
                <Board className={'flex flex-col bg-white'}>
                    <h1 className="text-3xl text-center">Hello, {!validateEmail(auth.profile.username) ? auth.profile.username : <>
                        <span className="text-red-500">please edit your username</span>
                    </>}</h1>
                    <div className="mb-3 text-center">
                        <span className="text-green-500">{isCopied && 'Link copied to clipboard'}</span>
                    </div>
                    <div className="flex items-stretch gap-1 justify-center">
                        <Anchor href={'/edit-profile'} className={'bg-yellow-300 hover:bg-yellow-200 flex items-center'}>Edit Profile</Anchor>
                        <Anchor href={`/form?user=${auth.data.user.id}`} className="bg-yellow-200 hover:bg-yellow-100 flex items-center">Your form</Anchor>
                        <CopyToClipboard text={`${location.origin}/form?user=${auth.data.user.id}`} onCopy={() => setIsCopied(true)}>
                            <Button className={'bg-green-400 hover:bg-green-300'}><i className="bi bi-share-fill"></i> copy link</Button>
                        </CopyToClipboard>
                        <Button className={'bg-red-500 hover:bg-red-400 flex items-center'} onClick={handleLogout}>Logout</Button>
                    </div>
                </Board>

                <div className="mt-3">
                    {isLoading ? <>
                        <Spinner />
                    </> : <>
                        <div className="grid grid-cols-2 md:grid-cols-4 mt-3 content-center gap-5">
                            {messages && messages.map((data) => {
                                return <Message callBack={handleDeleteCallback} className="" key={data.id} data={data} />
                            })}
                        </div>
                    </>}
                </div>

            </div>
        
        
        </> : <>
            <div className="flex px-10 flex-col h-full items-center justify-center">
                <h1 className="text-center">I'm sorry, something went wrong, u can logout and login again with goolge/email depends on what are u chose at first register/login</h1>
                <Button className={'bg-red-500 hover:bg-red-400 flex items-center mt-5 shadow-xl hover:shadow-md'} onClick={handleLogout}>Logout</Button>
            </div>
        
        </>}

    </>
}