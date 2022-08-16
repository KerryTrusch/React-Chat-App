import { useEffect, useState } from "react";
import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import TextArea from "./TextArea/TextArea";
function ChatArea({ socket }) {
    const [messageList, setMessageList] = useState([]);

    const createMessage = () => {
        var messageData = { op: 3 }
        socket.send(JSON.stringify(messageData));
    }

    async function addMessageToDB(msginfo) {
        return fetch('http://localhost:8000/addmessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(msginfo)
        })
        .then(data => data.json());
    }

    const addNewMessage = (info) => {
        setMessageList(oldArray => [...oldArray, info]);
        const { src, name } = info;
        const body = info.message;
        const time = info.timestamp;
        var url = window.location.pathname.split('/');
        const serverID = url[2];
        const channelID = url[3];
        const token = JSON.parse(sessionStorage.getItem("token")).token;
        addMessageToDB({
            src,
            body,
            time,
            name,
            token,
            serverID,
            channelID
        });
    }

    async function loadMessages(channelID) {
        return fetch('http://localhost:8000/getmessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(channelID)
        })
        .then(data => data.json());
    }


    useEffect(() => {
        const loadStartingMessages = async (channelID) => {
            const messages = await loadMessages({channelID});
            console.log(messages);
            setMessageList(messages);
        }
        const channelID = window.location.pathname.split('/');
        loadStartingMessages(channelID[3]);
    }, [])

    return (
        <div className="ChatWrapper">
            <TextArea messageList={messageList} />
            <ChatMessageBar name="my wife" addNewMessage={addNewMessage} />
        </div>
    )
}

export default ChatArea;