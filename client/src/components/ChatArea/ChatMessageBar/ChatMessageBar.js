import "./ChatMessageBar.css";
import ChatMessage from "../TextArea/ChatMessage";
import {useState} from 'react';
function ChatMessageBar(props) {
    const [body, setBody] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        obj = {body: body}
        props.socket.send(JSON.stringify(obj))
        document.getElementById('MessageInput').value = '';
    }
    return (
            <form className="MessageForm">
                <div className="MessageBar">
                    <input className="MessageInput" id="MessageInput" onChange={e => setBody(e.target.value)} placeholder={"Message @" + props.name }/>
                </div>
            </form>
    )
}

export default ChatMessageBar;