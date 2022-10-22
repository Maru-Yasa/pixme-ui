import { useRef, useState } from "react"
import { sendResetPassword } from "../api/Api"
import { intializeHotJar } from "../api/hotjar"
import { Board, Button, Spinner } from "../components/Components"

export const ForgotPassword = () => {

    const emailRef = useRef(null)
    const [state, setState] = useState({message: 'Success edit profile', error:false, done: false, isLoading: false})

    const handleSubmit = (e) => {
        e.preventDefault()
        setState({...state, isLoading: true})
        sendResetPassword(emailRef.current.value).then((res) => {
            setState({...state, message: 'we are send you reset password link via email', error:false,done: true, isLoading: false})
        }).catch((err) => {
            setState({...state, message: err.message, error: true, done: true, isLoading: false})
        })
    }

    useEffect(() => {
        intializeHotJar()
    }, [])

    return <>

        <div className="h-full px-5 flex justify-center items-center">
            <div className="grid grid-cols-12">
                <Board className={'max-h-1/2 bg-white md:col-span-6 col-span-12 md:col-start-4 justify-start align-start grid grid-cols-12'}>
                    <div className="col-span-5">
                        <h1 className="text-3xl">
                            Forgot Password
                        </h1>
                    </div>
                    <div className="col-span-12">
                        <form action="">
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="">Your Email</label>
                                <input ref={emailRef} type="email" name="email" className="border-2 border-black px-2 py-1" placeholder="your email" />
                            </div>
                            <div className="mb-3">
                                {state.done && state.error ? <>
                                    <span className="text-red-500">{state.message}</span>
                                </> : null}

                                {state.done && !state.error ? <>
                                    <span className="text-green-500">{state.message}</span>
                                </> : null}
                            </div>
                            <div className="mb-3">
                                <Button onClick={handleSubmit} className={'bg-blue-500 hover:bg-blue-400'}>{state.isLoading ? <Spinner /> : "Send recovery link"}</Button>
                            </div>
                        </form>
                    </div>
                </Board>
            </div>
        </div>
    
    </>
}