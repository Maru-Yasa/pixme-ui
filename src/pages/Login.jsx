import { login, loginWithGoogle } from "../api/Api"
import { Anchor, Board, Button, Spinner } from "../components/Components"
import { useAuthDispatch, useAuthState } from "../context/AuthContext"
import GoogleIcon from '../assets/Google.png'

export const Login = () => {
    const dispatch = useAuthDispatch()
    const auth = useAuthState()

    const handleRegister = (e) => {
        e.preventDefault()
        window.location.pathname = '/register'
    }

    const handleLoginGoogle = (e) => {
        e.preventDefault()
        loginWithGoogle().then((data) => {

        }).catch((err) => {
            console.log(err.message);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        var credentials = {};
        formData.forEach(function(value, key){
            credentials[key] = value;
        });
        login(dispatch,credentials).then(() => {

        }).catch((err) => {
            console.log(err.message);
        })
    }

    return <>

        <div className="w-full h-full flex justify-center items-center">
            <div className="grid grid-cols-12">
                <Board className={'max-h-1/2 bg-white md:col-span-6 col-span-12 md:col-start-4 justify-start align-start grid grid-cols-12'}>
                    <div className="col-span-3 text-start">
                        <h1 className="text-4xl">Login</h1>
                    </div>
                    <div className="col-span-12">
                        <form onSubmit={handleSubmit} action="">
                            <div className="mb-3 flex flex-col text-start">
                                <label htmlFor="">Email</label>
                                <input required type="text" name="email" className="border-2 border-black px-2 py-1" placeholder="your email" />
                            </div>
                            <div className="mb-3 flex flex-col text-start">
                                <label htmlFor="">Password</label>
                                <input required type="password" name="password" className="border-2 border-black px-2 py-1" placeholder="your password" />
                            </div>
                            <div className="mb-3 text-start">
                                <a href="/forgot-password" className="underline hover:text-blue-500">Forgot password?</a>
                            </div>
                            <div className="mb-3 text-start">
                                {auth.errorMessage && <>
                                    <span className="text-red-500">{auth.errorMessage}</span>
                                </>}
                            </div>
                            <div className="mb-3 text-start flex gap-1">
                                <Button type={'submit'} className={'bg-blue-500'}>
                                    {auth.isLoading ? <Spinner />: 'Login'}
                                </Button>
                                <Button onClick={handleRegister} className={'bg-yellow-300'}>Register</Button>
                            </div>
                            <div className="relative flex py-1 items-center">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="flex-shrink mx-4 text-gray-400">Or</span>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>
                            <div className="mb-3">
                                <Button onClick={handleLoginGoogle} className={'w-full inline-flex items-center justify-center align-middle text-md text-center gap-1 bg-blue-100'}>
                                    <img src={GoogleIcon} width={16} className={""} alt="" />
                                    Login with Google
                                </Button>
                            </div>
                        </form>
                    </div>
                </Board>
            </div>
        </div>
    
    </>
}