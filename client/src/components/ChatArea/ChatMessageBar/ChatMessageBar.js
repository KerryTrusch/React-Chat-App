import "./ChatMessageBar.css";
import ChatMessage from "../TextArea/ChatMessage";
import {useState} from 'react';
function ChatMessageBar({name, setBody}) {
    return (
            <form className="MessageForm" onSubmit={(e) => {e.preventDefault(); document.getElementById('inputbar').value = '';}}>
                <div className="MessageBar">
                    <input className="MessageInput" id="inputbar" onChange={e => {setBody(e.target.value)}} placeholder={"Message @" + {name} }/>
                </div>
            </form>
    )
}

export default ChatMessageBar;