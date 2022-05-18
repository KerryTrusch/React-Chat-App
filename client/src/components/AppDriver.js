import ServerHeader from './ServerBar/header';
import Sidebar from './DMSAndChannels/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import React, { useEffect, useState } from 'react';
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

const client = new WebSocket('ws://localhost:8000')

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
    }, [servers, servers.length])

    useEffect(() => {
        client.onopen = function() {
            const obj = {op: 0, server: 0, token: JSON.parse(sessionStorage.getItem('token'))}
            client.send(JSON.stringify(obj))
        }
        client.onmessage = function(evt) {
            console.log(evt.data)
        }
    }, [])
    const home = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} socket={client}/>
        <Sidebar />
        <ChatArea />
    </div>


    const server = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} socket={client}/>
        <Sidebar />
        <ChatArea />
    </div>

    return (
        <Routes>
            <Route path="/:id" element={server} />
            <Route exact path="/" element={home} />
        </Routes>
    )
}

export default AppDriver