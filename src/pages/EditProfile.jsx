import { useState } from "react"
import { editProfile, me, sendResetPassword } from "../api/Api"
import { intializeHotJar } from "../api/hotjar"
import { Anchor, Board, Button, Spinner } from "../components/Components"
import { useAuthDispatch, useAuthState } from "../context/AuthContext"
export const EditProfile = () => {

    const auth = useAuthState()
    const dispatch = useAuthDispatch()
    const [state, setState] = useState({message: 'Success edit profile', error:false, done: false})
    const [isLoading, setIsLoading] = useState({changePassword: false,  editProfile: false})
    const handleSave = (e) => {
        e.preventDefault()
        setState({...state, message: "", done: false})
        const formData = new FormData(e.target)
        var data = {};
        formData.forEach(function(value, key){
            data[key] = value;
        });
        setIsLoading({...isLoading, editProfile: true})
        editProfile(auth.data.user.id, data).then((res) => {
            me(auth.data.user.id).then((profile) => {
                localStorage.setItem('_profile', JSON.stringify(profile))
                dispatch({type: 'AFTER_UPDATE_PROFILE', profile: profile})
                setState({message: 'Success edit profile', error:false, done: true})
                setIsLoading({...isLoading, editProfile: false})
            })
        }).catch((err) => {
            setState({message: err.message, error:true, done: true})
        })

    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        setIsLoading({...isLoading, changePassword: true})
        sendResetPassword(auth.data.user.email).then((res) => {
            setState({message: 'we are send you reset password link via email', error:false, done: true})
            setIsLoading({...isLoading, changePassword: false})
        }).catch((err) => {
            setState({message: err.message, error:true, done: true})
        })
    }


    useEffect(() => {
        intializeHotJar()
    }, [])

    return <>

        <div className="h-full px-10 flex items-center justify-center">
            <div className="grid grid-cols-12">
                <Board className={'max-h-1/2 bg-white md:col-span-6 col-span-12 md:col-start-4 justify-start align-start grid grid-cols-12'}>
                    <div className="col-span-3 text-start">
                        <h1 className="text-3xl">Edit Profile</h1>
                    </div>
                    <div className="col-span-12">
                        <form onSubmit={handleSave} action="">
                            <div className="mb-3 flex flex-col text-start">
                                <label htmlFor="">Email</label>
                                <input disabled required type="text" value={auth.data.user.email} name="email" className="border-2 border-black px-2 py-1" placeholder="your email" />
                            </div>   
                            <div className="mb-3 flex flex-col text-start">
                                <label htmlFor="">Username</label>
                                <input required type="text" name="username" defaultValue={auth.profile.username} className="border-2 border-black px-2 py-1" placeholder="your username"/>
                            </div> 
                            <div className="mb-3 text-start">

                                {state.done && state.error ? <>
                                    <span className="text-red-500">{state.message}</span>
                                </> : null}

                                {state.done && !state.error ? <>
                                    <span className="text-green-500">{state.message}</span>
                                </> : null}
                            
                            </div>     
                            <div className="mb-3 text-start flex gap-3">
                                <Button type={'submit'} className={'bg-blue-500 hover:bg-blue-400'}>Save changes</Button>
                                <Button onClick={handleChangePassword} className={'bg-yellow-300 hover:bg-yellow-200'}>{isLoading.changePassword ? <Spinner /> : 'Change password'}</Button>
                                <Anchor href={'/profile'} className={'bg-red-500 hover:bg-red-400 flex items-center'}>Back</Anchor>
                            </div>     
                        </form>
                    </div>
                </Board>
            </div>
        </div>

    </>
}