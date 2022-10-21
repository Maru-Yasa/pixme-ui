import { useEffect, useRef, useState } from "react"
import { useScreenshot } from "use-react-screenshot"
import { getMessageById } from "../api/Api"
import { Board, Button, Spinner } from "../components/Components"
import { useAuthState } from "../context/AuthContext"
import { params } from "../lib/helpers"

export const DetailMessage = () => {

    const id = params.id ? params.id : null
    const auth = useAuthState()
    const [message, setMessage] = useState(null)
    const screenRef = useRef(null)
    const shareButton = useRef(null)
    const [image, takeScreenshot] = useScreenshot()
    const [isLoading, setIsLoading] = useState(true)

    const [isScreenShoot, setIsScreenShoot] = useState({data: false, type: 'download'})

    const getimage = () => {
        setIsScreenShoot({data: true, type: 'download'})    
    }

    const handleShare = (e) => {
        e.preventDefault()
        setIsScreenShoot({data: true, type: 'share'})    
        // fetch('instagram-stories://share', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'image/png',
        //         'Content-Transfer-Encoding': 'base64'
        //     },
        //     body: image,
        // }).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err.message);
        // })
    }

    useEffect(() => {
        console.log(isScreenShoot);
        if(!message && id){
            getMessageById(auth.data.user.id, id).then((msg) => {
                setMessage(msg)
            }).catch((err) => {
                console.log(err.message);
            })
        }
    },[])

    useEffect(() => {
        if(message){
            setIsLoading(false)
        }
    }, [message])

    useEffect(() => {
        if(isScreenShoot.data){
            takeScreenshot(screenRef.current)
        }
    }, [isScreenShoot])

    useEffect(() => {
        if(image && isScreenShoot.data && isScreenShoot.type === 'download'){
            const a = document.createElement("a");
            a.href = image
            a.download = `pixme-${id}.png`;
            a.click();
            setIsScreenShoot({data: false, type: 'download'})
        }

        if(image && isScreenShoot.data && isScreenShoot.type === 'share'){
            const a = document.createElement("a");
            a.href = image
            a.download = `pixme-${id}.png`;
            a.click();

            setIsScreenShoot({data: false, type: 'share'})
            const a2 = document.createElement('a');
            a2.href = 'instagram://story-camera'
            a2.click()

        }

    }, [image])

    return <>
    
        <div ref={screenRef} className="w-full h-full flex justify-center items-center with-bg p-10">
            <div className="w-full grid grid-cols-12">
                <Board className={'relative bg-white md:col-span-4 col-span-12 md:col-start-5'}>
                    {isLoading ? "Loading..." : <>
                        <div className="text-start flex flex-col gap-3">
                            <div className="bg-blue-300 p-3 flex items-center">
                                <h1 className="text-3xl">Send me a message :</h1>
                            </div>
                            <h3 className="text-xl text-black-400 p-3">
                                {message.message}
                            </h3>
                        </div>
                    </>}
                </Board>
                {!isScreenShoot.data && <>
                    <div ref={shareButton} className="md:col=span-4 mt-5 col-span-12 md:col-start-5 flex gap-3">
                        <Button onClick={handleShare} className={'shadow-xl hover:shadow-md bg-yellow-500'}> <i className="bi bi-share-fill"></i> </Button>
                        <Button onClick={() => getimage()} className={'shadow-xl hover:shadow-md bg-yellow-500'}> <i className="bi bi-camera-fill"></i> </Button>
                    </div>
                </>}
                <div className="col-span-12 mt-5">
                    Pixme.<span className="text-blue-500">site</span>
                </div>
            </div>
        </div>

    </>

}