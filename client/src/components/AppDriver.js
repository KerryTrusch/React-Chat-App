import ServerHeader from './ServerBar/header';
import Sidebar from './DMSAndChannels/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ws } from '../../../server/routes/record';

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

const client = new WebSocket('ws://localhost:8000')
const heartbeat_msg = '--heartbeat--', heartbeat_interval = null, missed_heartbeats = 0;

function AppDriver() {
    const [servers, setServers] = useState([]);
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
        client.onopen = function() {
            const obj = {op: 0, server: 0, token: JSON.parse(sessionStorage.getItem('token'))}
            client.send(JSON.stringify(obj))
            if (heartbeat_interval == null) {
                missed_heartbeats = 0;
                heartbeat_interval = setInterval(function() {
                    try {
                        missed_heartbeats++;
                        if (missed_heartbeats > 2) {
                            throw new Error("Too many missed heartbeats");
                        }
                        ws.send(JSON.stringify({op: 9, heartbeat: heartbeat_msg}));
                    } catch(e) {
                        clearInterval(heartbeat_interval)
                        heartbeat_interval = null;
                        console.warn("Closing connection. Reason: " + e.message)
                        client.close();
                    }
                }, 5000)
            }
        }
        client.onmessage = function(evt) {
            if (evt.data === heartbeat_msg) {
                missed_heartbeats = 0;
                return;
            }
        }
        client.onclose = function() {
            const obj = {op: 2, token: JSON.parse(sessionStorage.getItem('token'))}
            client.send(JSON.stringify(obj));
        }
    }, [])

    const home = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} socket={client}/>
        <Sidebar />
        <ChatArea socket={client}/>
    </div>


    const server = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} socket={client}/>
        <Sidebar />
        <ChatArea socket={client}/>
    </div>

    return (
        <Routes>
            <Route path="/:id" element={server} />
            <Route exact path="/" element={home} />
        </Routes>
    )
}

export default AppDriver