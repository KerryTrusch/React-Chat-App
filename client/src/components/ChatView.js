import ChatArea from "./ChatArea/ChatArea";
import ChannelBar from "./DMSAndChannels/Channels/Channels";
import { useState, useEffect } from 'react';
export default function ChatView({client, channels, setChannels, messageList, setMessageList, loadMessages, setServerinfo, serverinfo}) {
    const [users, setUsers] = useState([]);
    const name = channels[0] === undefined ? "" : channels[0].name;
    const [channelName, setChannelName] = useState(name);
    const channelID = window.location.pathname.split('/');

    async function loadUsers(serverID) {
        return fetch('http://localhost:8000/getusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serverID)
        })
            .then(data => data.json());
    }

    async function loadServerInfo(serverID) {
        return fetch('http://localhost:8000/getserverinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serverID)
        })
            .then(data => data.json());
    }

    useEffect(() => {
        const loadStartingMessages = async (channelID) => {
            const messages = await loadMessages({ channelID });
            setMessageList(messages);
        }
        const loadStartingUsers = async (serverID) => {
            const users = await loadUsers({serverID});
            setUsers(users);
        }
        const loadStartingInfo = async (serverID) => {
            const info = await loadServerInfo({serverID});
            setServerinfo(info);
        }
        loadStartingMessages(channelID[3]);
        loadStartingUsers(channelID[2]);
        loadStartingInfo(channelID[2]);
        client.onmessage = (e) => {
            if (e.data !== '--heartbeat--') {
                let msg = JSON.parse(e.data);
                if (msg.op === 3) {
                    setMessageList(oldArray => [...oldArray, msg.message]);
                }
            }
        }
    }, [])

    return (
        <div className="flex w-full h-full">
            <ChannelBar channels={channels} serverName={serverinfo.name} setChannels={setChannels} setChannelName={setChannelName} setMessageList={setMessageList} loadMessages={loadMessages} serverID={serverinfo.serverID}/>
            <ChatArea socket={client} messageList={messageList} setMessageList={setMessageList} channelName={channelName} users={users}/>
        </div>
    )
}