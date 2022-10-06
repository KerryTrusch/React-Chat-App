import ServerHeader from './ServerBar/header';
import Sidebar from './DMSAndChannels/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

async function getServers(authId) {
    return fetch("http://localhost:8000/getuserservers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authId)
    })
        .then(data => data.json())
}

let client = new WebSocket('ws://localhost:8000')
function AppDriver() {
    const [servers, setServers] = useState([]);
    const [missed_heartbeats, setMissed_heartbeats] = useState(0);
    const [messages, setMessages] = useState([]);
    const loadServers = async () => {
        const token = JSON.parse(sessionStorage.getItem('token')).token
        var newServers = await getServers({ token });
        newServers = newServers.SERVERS;
        setServers(newServers);
    }

    useEffect(() => {
        loadServers()
    }, [servers])

    
    useEffect(() => {
        client = new WebSocket('ws://localhost:8000')
        var heartbeat_msg = '--heartbeat--', heartbeat_interval = null;
        client.onopen = () => {
            const obj = { op: 0, server: 0, token: JSON.parse(sessionStorage.getItem('token')) }
            client.send(JSON.stringify(obj))
            if (heartbeat_interval == null) {
                setMissed_heartbeats(0);
                heartbeat_interval = setInterval(function () {
                    try {
                        setMissed_heartbeats((prevVal) => prevVal + 1)
                        if (missed_heartbeats > 2) {
                            throw new Error("Too many missed heartbeats");
                        }
                        client.send(JSON.stringify({ op: 9, heartbeat: heartbeat_msg }));
                    } catch (e) {
                        clearInterval(heartbeat_interval)
                        heartbeat_interval = null;
                        console.warn("Closing connection. Reason: " + e.message)
                        client.close();
                    }
                }, 5000)
            }
        }
        client.onclose = function () {
            const obj = { op: 2, token: JSON.parse(sessionStorage.getItem('token')) }
            client.send(JSON.stringify(obj));
        }
    }, [])

    const home = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} socket={client} setMessages={setMessages} />
        <Sidebar />
        <ChatArea socket={client} beats={setMissed_heartbeats} messages={messages} setMessages={setMessages}/>
    </div>


    const server = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} socket={client} setMessages={setMessages} />
        <Sidebar />
        <ChatArea socket={client} beats={setMissed_heartbeats} messages={messages} setMessages={setMessages}/>
    </div>

    return (
        <Routes>
            <Route path="/:id" element={server} />
            <Route exact path="/" element={home} />
        </Routes>
    )
}

export default AppDriver