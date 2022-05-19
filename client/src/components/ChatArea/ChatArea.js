import { useEffect, useState } from "react";
import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import TextArea from "./TextArea/TextArea";
function ChatArea({socket}) {
    const token = JSON.parse(sessionStorage.getItem('token'))
    const [body, setBody] = useState('');
    const [message, setMessage] = useState({user: token, body: body});
    const [messageList, setMessageList] = useState([]);
    useEffect(() => {
        setMessage({user: token, body: body})
    }, [body])

    const createMessage = () => {
        var messageData = {op: 3}
        socket.send(JSON.stringify(messageData));
    }
    return (
        <div className="ChatWrapper">
            <TextArea />
            <ChatMessageBar name="Forodin" setBody={setBody}/>
        </div>
    )
}

export default ChatArea;