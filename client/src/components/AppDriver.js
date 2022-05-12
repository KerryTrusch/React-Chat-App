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

function AppDriver() {
    var socket = new WebSocket('ws://localhost:8000');
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
    const home = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} />
        <Sidebar />
        <ChatArea socket={socket} />
    </div>


    const server = <div style={{ display: 'flex' }}>
        <ServerHeader servers={servers} setServers={setServers} />
        <Sidebar />
        <ChatArea socket={socket}/>
    </div>

    return (
        <Routes>
            <Route path="/:id" element={server} />
            <Route exact path="/" element={home} />
        </Routes>
    )
}

export default AppDriver