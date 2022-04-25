import Headers from './ServerBar/header';
import Sidebar from './DMSAndChannels/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import React from 'react';

function AppDriver({ token }) {
    const TokenContext = React.createContext("");
    return (
        <TokenContext.Provider value={token}>
            <div style={{display: 'flex'}}>
                <Headers />
                <Sidebar />
                <ChatArea />
            </div>
        </TokenContext.Provider>
    )
}

export default AppDriver