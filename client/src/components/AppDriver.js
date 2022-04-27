import Headers from './ServerBar/header';
import Sidebar from './DMSAndChannels/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import React from 'react';

function AppDriver() {
    return (
            <div style={{display: 'flex'}}>
                <Headers />
                <Sidebar />
                <ChatArea />
            </div>
    )
}

export default AppDriver