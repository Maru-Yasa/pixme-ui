import { useEffect, useState } from "react";
import { getUserById, sendMessage } from "../api/Api";
import { Board, Button, Spinner } from "../components/Components"
import { params } from "../lib/helpers";

export const Form = () => {

    const user_id = params.user ? params.user : null
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.target)
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        sendMessage(object).then((res) => {
            setIsLoading(false)
            setTimeout(() => {
                window.location.search = ''
                window.location.href = '/success'
            }, 1000);
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        if(user_id){
            getUserById(user_id).then((data) => {
                setUser(data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }, [])

    useEffect(() => {
        if(user){
            setIsLoading(false)
            console.log(user);
        }
    }, [user])

    return <>

        {user_id ? <>


            {user && <>
                <div className="w-full px-10 h-full flex justify-center items-center">
                    <div className="grid grid-cols-12">
                        <Board className={'md:col-span-6 col-span-12 md:col-start-4 bg-white flex flex-col justify-start w-full min-w-full max-w-full'}>
                            <div className="text-start mb-3">
                                <h1 className="text-3xl">Send message to {user.username}</h1>
                            </div>
                            <div className="">
                                <form onSubmit={handleSubmit} action="">
                                    <div className="mb-3 flex flex-col text-start">
                                        <label htmlFor="">Message :</label>
                                        <textarea required type="text" name="message" className="border-2 border-black px-2 py-1" placeholder="your message"></textarea>
                                        <input type="text" hidden name="user_id" value={user.user_id} />
                                    </div>
                                    <div className="mb-3 flex justify-start gap-2">
                                        <Button type={'submit'} className='bg-blue-500'>
                                            {isLoading ? <Spinner /> : "Send"}
                                        </Button>
                                        <Button onClick={(e) => {e.preventDefault();window.location.pathname = '/'}} className='bg-red-500'>Back</Button>
                                    </div>
                                </form>
                            </div>
                        </Board>
                        <div className="col-span-12 mt-5 text-center">
                            <button onClick={() => {window.location.pathname = '/register'}} className="underline">
                                Want to get feedback too?, register now!
                            </button>
                        </div>
                    </div>
                </div>
            
            </>}
        </> : <>
        
            <div className="h-full flex flex-col justify-center items-center">
                <h1 className="text-3xl">User not found</h1>
                <Button onClick={() => {window.location.pathname = '/'}} className={'bg-red-500 shadow-xl hover:shadow-md mt-3'}>Go back</Button>
            </div>

        
        </>}

    
    </>
}