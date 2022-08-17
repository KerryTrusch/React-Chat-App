import { useEffect, useState } from "react";
import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import TextArea from "./TextArea/TextArea";
function ChatArea({ socket }) {
    const [messageList, setMessageList] = useState([]);

    const createMessageSocket = (messageData) => {
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
        const body = info.message;
        const message = info.message;
        const time = info.timestamp;
        const timestamp = info.timestamp;
        var url = window.location.pathname.split('/');
        const serverID = url[2];
        const channelID = url[3];
        let token = JSON.parse(sessionStorage.getItem("token")).token;
        createMessageSocket({
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
            const messages = await loadMessages({ channelID });
            console.log(messages);
            setMessageList(messages);
        }
        const channelID = window.location.pathname.split('/');
        loadStartingMessages(channelID[3]);
        socket.onmessage = (e) => {
            if (e.data !== '--heartbeat--') {
                let msg = JSON.parse(e.data);
                if (msg.op === 3) {
                    setMessageList(oldArray => [...oldArray, msg.message]);
                }
            }
        }
    }, [])

    return (
        <div className="ChatWrapper">
            <TextArea messageList={messageList} />
            <ChatMessageBar name="my wife" addNewMessage={addNewMessage} />
        </div>
    )
}

export default ChatArea;