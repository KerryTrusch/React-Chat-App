import "./ChatMessageBar.css";
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
        <form className="MessageForm" onSubmit={handleSubmit}>
            <div className="MessageBar">
                <input className="MessageInput" id="inputbar" onChange={e => { setBody(e.target.value) }} placeholder={"Message @" + name} />
            </div>
        </form>
    )
}

export default ChatMessageBar;