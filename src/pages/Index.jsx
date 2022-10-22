import { Button } from "../components/Components"
import Dino from '../assets/dino.gif'
export const Index = () => {

    const getStarted = (e) => {
        e.preventDefault()
        window.location.pathname = '/login'
    }

    const donate = (e) => {
        e.preventDefault()
        window.location = 'https://saweria.co/Maru'
    }

    return <>
    
        <div className="min-h-full min-w-full flex flex-col justify-center items-center">
            <h1 className="text-5xl">Pixme</h1>
            <h2 className="text-md">Get anonymous feedback from your Friends,</h2>
            <span className="text-red-500">(if you had friend tho)</span>
            <div className="flex gap-4">
                <Button onClick={getStarted} className={'bg-blue-500 shadow-xl mt-3 hover:shadow-md'}>Get Started</Button>
                <Button onClick={donate} className={'bg-yellow-500 shadow-xl mt-3 hover:shadow-md flex gap-1 align-middle'}><i className="bi bi-cash"></i> Donate</Button>
            </div>
            <div className="flex mt-5">
                <span>V 0.0.1 (Beta)</span>
            </div>
        </div>
    
    </>
}