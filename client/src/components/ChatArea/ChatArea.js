import { useEffect, useState } from "react";
import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import TextArea from "./TextArea/TextArea";
function ChatArea({ socket }) {
    const [messageList, setMessageList] = useState([{ "src": "discord-pfp.png", "name": "test", "time": "11:59 PM", "body": "this is a test message" }]);

    const createMessage = () => {
        var messageData = { op: 3 }
        socket.send(JSON.stringify(messageData));
    }

    const addNewMessage = (info) => {
        setMessageList(oldArray => [...oldArray, info]);
    }

    async function loadMessages() {
        var path = window.location.pathname;
        var str = path.split("/");
        if (str.length >= 3 && str[2].length === 8) {
            return fetch('http://localhost:8000/getmessages/' + str[2], {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(data => data.json());
        }
    }

    useEffect(() => {
        loadMessages();
    }, [])
    return (
        <div className="ChatWrapper">
            <TextArea messageList={messageList} />
            <ChatMessageBar name="my wife" addNewMessage={addNewMessage} />
        </div>
    )
}

export default ChatArea;