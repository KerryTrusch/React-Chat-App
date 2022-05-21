import { useEffect, useState } from "react";
import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import ChatMessage from "./TextArea/ChatMessage";
import TextArea from "./TextArea/TextArea";
function ChatArea({socket, beats}) {
    const token = JSON.parse(sessionStorage.getItem('token'))
    const [body, setBody] = useState('');
    const [messageList, setMessageList] = useState([]);
    useEffect(() => {
        socket.onmessage = function (evt) {
            if (evt.data === '--heartbeat--') {
                beats(0);
                return;
            } else {
                let data = JSON.parse(evt.data)
                let newMessage = <ChatMessage source={data} />
                setMessageList((prevVal) => [...prevVal, newMessage])
            }
        }
    }, [])

    const createMessage = () => {
        var messageData = {op: 3, body: body, token: JSON.parse(sessionStorage.getItem('token'))}
        socket.send(JSON.stringify(messageData));
        const newMessageData = {body: body, src: 'discord-pfp.png', time: '11:59PM', name: 'Forodin'}
        const newMessage = <ChatMessage source={newMessageData} />
        setMessageList((prevVal) => [...prevVal, newMessage])
    }
    return (
        <div className="ChatWrapper">
            <TextArea messages={messageList}/>
            <ChatMessageBar name="Forodin" setBody={setBody} createMessage={createMessage}/>
        </div>
    )
}

export default ChatArea;