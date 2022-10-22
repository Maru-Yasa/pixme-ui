import { useEffect, useState } from "react"
import { logout, resetPassword } from "../api/Api";
import { supabase } from "../api/supabase"
import { Anchor, Board, Button, Spinner } from "../components/Components";
import { useAuthDispatch } from "../context/AuthContext";

export const ResetPassword = () => {
    
    const dispatch = useAuthDispatch()

    const [state, setState] = useState({
        isValid: false,
        isDone: false,
        isError: false,
        message: "",
        isLoading: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        var data = {};
        formData.forEach(function(value, key){
            data[key] = value;
        });
        
        setState({...state, isLoading: true})
        resetPassword(formData).then((res) => {
            setState({
                ...state,
                isDone: true,
                isError: false,
                message: 'Password update successfully!',
                isLoading: false
            })
            logout(dispatch).then(() => {
                window.location = '/login'
            })
        }).catch((err) => {
            setState({
                ...state,
                isDone: true,
                isError: true,
                message: err.message
            })
        })
    }

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if(event === 'PASSWORD_RECOVERY'){
                setState({
                    ...state,
                    isValid: true,
                })
            }
        })
    }, [])
    
    return <>
    
        {state.isValid && <>
        
            <div className="h-full flex flex-col justify-center items-center">
                <div className="grid grid-cols-12">
                    <Board className={'max-h-1/2 bg-white md:col-span-6 col-span-12 md:col-start-4 justify-start align-start grid grid-cols-12'}>
                        <div className="col-span-5 text-start">
                            <h1 className="text-3xl">Reset password</h1>
                        </div>
                        <div className="col-span-12">
                            <form onSubmit={handleSubmit} action="">
                                <div className="mb-3 flex flex-col text-start">
                                    <label htmlFor="">New password</label>
                                    <input required type="password" name="new_password" className="border-2 border-black px-2 py-1" placeholder="your new password" />
                                </div> 
                                <div className="mb-3 text-start">
                                    {state.isDone && state.isError && <>
                                        <span className="text-red-500 text-start">{state.message}</span>
                                    </>}
                                    {state.isDone && !state.isError && <>
                                        <span className="text-green-500 text-start">{state.message}</span>
                                    </>}
                                </div>
                                <div className="mb-3 text-start flex gap-3">
                                    <Button type={'submit'} className="bg-blue-500 hover:bg-blue-400">{state.isLoading ? <Spinner /> : "Change"}</Button>
                                </div>
                            </form>
                        </div>
                    </Board>
                </div>
            </div>
        
        </>}

        {!state.isValid && <>
        
            <div className="h-full flex flex-col justify-center items-center">
                <h1 className="text-xl">Recovery link not valid</h1>
                <Anchor href={'/'} className={'mt-3 bg-red-500 hover:bg-red-400 shadow-xl hover:shadow-md'}>Back</Anchor>
            </div>

        </>}

    </>
}