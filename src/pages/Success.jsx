import { Anchor, Button } from "../components/Components"
import { useAuthState } from "../context/AuthContext"

export const Success = () => {

    const auth = useAuthState()

    return <>
    
        <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-3xl">Success sending a message</h1>
            <h3 className="text-slate-500">thanks for using our application :)</h3>
            <div className="flex gap-5">
                <Anchor href={'/'} className={'bg-blue-500 shadow-xl hover:shadow-md mt-3'}>Go back</Anchor>
                {!auth.data.user && <>
                    <Anchor href={'/register'} className={'bg-blue-300 shadow-xl hover:shadow-md mt-3'}>Register now :3</Anchor>
                </>}
            </div>
        </div>
    
    </>
}