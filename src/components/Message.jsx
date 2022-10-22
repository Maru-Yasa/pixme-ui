import { Anchor, Board, Button } from "./Components"
import dayjs from "dayjs"
import { deleteMessageById } from "../api/Api"

export const Message = ({key, className, data, callBack}) => {
    const date = dayjs(data.created_at)

    const handleDelete = (e) => {
        e.preventDefault()
        deleteMessageById(data.id).then(() => {
            callBack()
        }).catch(() => {

        })
    }

    return <>
        <Anchor href={`/message?id=${data.id}`} key={data.id} className={`relative shadow-xl bg-white text-center flex flex-col hover:shadow-md ${data.opened ? 'bg-white' : 'bg-blue-200'} ${className}`}>
            {data.opened && <>
                <button onClick={handleDelete} className="absolute top-1 right-2">
                    <i className="bi bi-x-circle-fill"></i>
                </button>
            </>}
            {data.opened ? <i className="bi bi-envelope-paper-fill text-7xl"></i> : <i className="bi bi-envelope-fill text-7xl"></i>}
            {date.format('DD-MM-YYYY')}
        </Anchor>
    </>
}