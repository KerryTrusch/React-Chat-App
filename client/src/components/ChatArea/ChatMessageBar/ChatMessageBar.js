import { useState, useContext } from 'react';
import moment from 'moment';
import { nameContext } from "../../../App";
function ChatMessageBar({ name, addNewMessage }) {
    const [body, setBody] = useState('');
    const uname = useContext(nameContext);
    const handleSubmit = e => {
        e.preventDefault();
        if (document.getElementById("inputbar").value.length > 0) {
            document.getElementById("inputbar").value = '';
            const time = moment().format('MMMM Do YYYY, h:mm:ss a');
            const info = { "src": "discord-pfp.png", "message": body, "timestamp": time, "name": uname, "key": Date.now() };
            addNewMessage(info);
        }
    }
    return (
        <form className="block px-4 shrink-0" onSubmit={handleSubmit}>
            <div className="mb-6 relative w-full">
                <input className="px-4 py-2.5 bg-[#40444b] border-none w-full rounded-lg text-white" id="inputbar" onChange={e => { setBody(e.target.value) }} placeholder={"Message @" + name} />
            </div>
        </form>
    )
}

export default ChatMessageBar;