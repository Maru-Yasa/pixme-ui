import { Board } from "./Components"
import EnvelopeOpen from '../assets/envelope-open.png'
import EnvelopeClosed from '../assets/envelope-closed.png'
import dayjs from "dayjs"

export const Message = ({key, className, data}) => {
    const date = dayjs(data.created_at)
    return <>
        <Board key={data.id} className={`bg-white text-center flex flex-col hover:shadow-md ${data.opened ? 'bg-white' : 'bg-blue-200'} mx-3 ${className}`}>
            {data.opened ? <i className="bi bi-envelope-paper-fill text-7xl"></i> : <i className="bi bi-envelope-fill text-7xl"></i>}
            {date.format('DD-MM-YYYY')}
        </Board>
    </>
}