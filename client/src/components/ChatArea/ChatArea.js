import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import TextArea from "./TextArea/TextArea";
import ChatHeader from "./ChatHeader";
import UserList from "./UserList";
import { useEffect } from "react";
function ChatArea({ socket, messageList, setMessageList, name, channelName }) {

    const sendMessageThroughSocket = (messageData) => {
        let wsInfo = { op: 3, msgdata: messageData, channelID: window.location.pathname.split('/')[3] };
        socket.send(JSON.stringify(wsInfo));
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
        const message = info.message;
        const timestamp = info.timestamp;
        var url = window.location.pathname.split('/');
        const serverID = url[2];
        const channelID = url[3];
        let token = JSON.parse(sessionStorage.getItem("token")).token;
        sendMessageThroughSocket({
            src,
            message,
            timestamp,
            name,
            token,
            serverID,
            channelID
        });
        addMessageToDB({
            src,
            message,
            timestamp,
            name,
            token,
            serverID,
            channelID
        });
    }

    return (
        <div className="ChatWrapper w-full h-full">
            <ChatHeader channelName={channelName} />
            <div className="min-w-0 min-h-0 grow-1 shrink-1 basis-auto flex justify-items-stretch items-stretch relative h-full w-full">
                <div className="flex flex-col min-w-0 min-h-0 grow-1 shrink-1 basis-auto h-full w-full">
                    <TextArea messageList={messageList} />
                    <ChatMessageBar name={channelName} addNewMessage={addNewMessage} />
                </div>
                <UserList users_online={1} />
            </div>
        </div>
    )
}

export default ChatArea;