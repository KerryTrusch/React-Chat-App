import Headers from './ServerBar/header';
import Sidebar from './DMSAndChannels/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import React, { useEffect, useState } from 'react';

async function getServers(authId) {
    return fetch("http://localhost:5000/getuserservers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authId)
    })
    .then(data => data.json())
}

function AppDriver() {
    const [servers, setServers] = useState('');

    useEffect(() => {

        if (!servers) {
            loadServers();
        }
    }, [servers])
    const loadServers = async () => {
        const token = JSON.parse(sessionStorage.getItem('token')).token
        const servers = await getServers({token});
        setServers(servers.SERVERS);
    }
    console.log(servers);
    return (
            <div style={{display: 'flex'}}>
                <Headers />

                <Sidebar />
                <ChatArea />
            </div>
    )
}

export default AppDriver