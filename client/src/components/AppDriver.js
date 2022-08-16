import Home from './Home';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatView from './ChatView';
import Header from './ServerBar/header';
async function getServers(authId) {
    return fetch("http://localhost:8000/getservers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authId)
    })
        .then(data => data.json())
}

async function getFriends() {
    return fetch("http://localhost:8000/getusersservers", {
        method: 'GET',
        headers: {

        }
    })
}
let client = new WebSocket('ws://localhost:8000')
function AppDriver() {
    const [servers, setServers] = useState([]);
    const [channels, setChannels] = useState([]);
    const [missed_heartbeats, setMissed_heartbeats] = useState(0);
    const loadServers = async () => {
        const token = JSON.parse(sessionStorage.getItem('token')).token
        const newServers = await getServers({ token });
        setServers(newServers);
    }


    useEffect(() => {
        loadServers()
    }, [])

    useEffect(() => {
        client = new WebSocket('ws://localhost:8000')
        var heartbeat_msg = '--heartbeat--', heartbeat_interval = null;
        client.onopen = () => {
            const obj = { op: 0, token: JSON.parse(sessionStorage.getItem('token')) }
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

    return (
        <div className='flex h-screen w-full'>
            <Header servers={servers} setServers={setServers} socket={client} setChannels={setChannels}/>
            <Routes>
                <Route exact path="/friends" element={<Home />} />
                <Route path="/:id/*" element={<ChatView client={client} channels={channels}/>} />
            </Routes>
        </div>
    )
}

export default AppDriver