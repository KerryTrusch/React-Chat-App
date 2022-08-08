import "./ChatMessageBar.css";
import {useState} from 'react';
function ChatMessageBar({name, addNewMessage}) {
    const [body, setBody] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        document.getElementById("inputbar").value = '';
        const info = {"src": "discord-pfp.png", "body": body, "time": "11:59 PM", "name": "Tester"};
        addNewMessage(info);
    }
    return (
            <form className="MessageForm" onSubmit={handleSubmit}>
                <div className="MessageBar">
                    <input className="MessageInput" id="inputbar" onChange={e => {setBody(e.target.value)}} placeholder={"Message @" + name }/>
                </div>
            </form>
    )
}

export default ChatMessageBar;