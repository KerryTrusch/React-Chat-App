import ServerHeader from './ServerBar/header';
import Sidebar from './DMSAndChannels/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import React, { useEffect, useState } from 'react';

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
    return (
        <div style={{ display: 'flex' }}>
            <ServerHeader servers={servers} setServers={setServers}/>
            <Sidebar />
            <ChatArea />
        </div>
    )
}

export default AppDriver