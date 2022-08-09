import "./ChatMessageBar.css";
import {useState, useContext} from 'react';
import {moment} from 'moment';
function ChatMessageBar({name, addNewMessage}) {
    const [body, setBody] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        document.getElementById("inputbar").value = '';
        const time = moment().format('L');
        const info = {"src": "discord-pfp.png", "body": body, "time": time, "name": "Tester"};
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