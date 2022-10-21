import { Anchor, Board, Button } from "./Components"
import EnvelopeOpen from '../assets/envelope-open.png'
import EnvelopeClosed from '../assets/envelope-closed.png'
import dayjs from "dayjs"

export const Message = ({key, className, data}) => {
    const date = dayjs(data.created_at)
    return <>
        <Anchor href={`/message?id=${data.id}`} key={data.id} className={`relative shadow-xl bg-white text-center flex flex-col hover:shadow-md ${data.opened ? 'bg-white' : 'bg-blue-200'} ${className}`}>
            {data.opened && <>
                <button className="absolute top-1 right-2">
                    <i className="bi bi-x-circle-fill"></i>
                </button>
            </>}
            {data.opened ? <i className="bi bi-envelope-paper-fill text-7xl"></i> : <i className="bi bi-envelope-fill text-7xl"></i>}
            {date.format('DD-MM-YYYY')}
        </Anchor>
    </>
}