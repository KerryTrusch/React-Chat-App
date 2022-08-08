import './header.css';
import './ServerButton.css';
import CreateServer from './CreateServerModal';
import ServerButton from './ServerButton';
import React, { useState } from 'react';
function Header({ servers, setServers, socket }) {
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
            <li className="liForServers" key={server.serverID}>
                <ServerButton src={server.imgsrc} link={server.serverID} socket={socket} className="serverButton"/>
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
                        <img className="serverButton" alt='' src={'/create-plus.png'} />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Header;