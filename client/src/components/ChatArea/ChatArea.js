import { useEffect, useState } from "react";
import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import ChatMessage from "./TextArea/ChatMessage";
import TextArea from "./TextArea/TextArea";
function ChatArea({socket, beats, messages, setMessages}) {
    const token = JSON.parse(sessionStorage.getItem('token'))
    const [body, setBody] = useState('');
    useEffect(() => {
        socket.onmessage = function (evt) {
            if (evt.data === '--heartbeat--') {
                beats(0);
                return;
            } else {
                let data = JSON.parse(evt.data)
                let newMessage = <ChatMessage source={data} />
                setMessages((prevVal) => [newMessage, ...prevVal])
            }
        }
    }, [])

    const createMessage = () => {
        var messageData = {op: 3, body: body, token: JSON.parse(sessionStorage.getItem('token'))}
        socket.send(JSON.stringify(messageData));
        const newMessageData = {body: body, src: 'discord-pfp.png', time: '11:59PM', name: 'Forodin'}
        const newMessage = <ChatMessage source={newMessageData} />
        setMessages((prevVal) => [newMessage, ...prevVal])
    }
    return (
        <div className="ChatWrapper">
            <TextArea rawmessages={messages}/>
            <ChatMessageBar name="Forodin" setBody={setBody} createMessage={createMessage}/>
        </div>
    )
}

export default ChatArea;