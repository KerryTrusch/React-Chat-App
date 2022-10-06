import './header.css';
import './ServerButton.css';
import CreateServer from './CreateServerModal';
import ServerButton from './ServerButton';
import React, { useState } from 'react';
function Header({ servers, setServers, socket, setMessages }) {
    const [showmod, setShowmod] = useState();

    const showModal = () => {
        setShowmod(true);
    }

    const hideModal = () => {
        setShowmod(false);
    }

    
    var listOfServers;
    if (servers) {
        listOfServers = servers.map((server) =>
            <li className="liForServers" key={server._id}>
                <ServerButton src={server.src} link={server.id} socket={socket} setMessages={setMessages} />
            </li>
        );
    } else {
        listOfServers = <div></div>
    }
    return (
        <div>
            <ul className="ulForServers">
                {listOfServers}
                <li className="liForServers">
                    <CreateServer show={showmod} handleClose={hideModal} setServers={setServers} servers={servers}/>
                    <button type="button" onClick={showModal}>
                        <img className="serverButton" onerror="this.src='create-plus.png'" alt='' src='create-plus.png' />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Header;