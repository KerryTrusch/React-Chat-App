import './header.css';
import './ServerButton.css';
import CreateServer from './CreateServerModal';
import ServerButton from './ServerButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Header({ servers, setServers, socket, setChannels }) {
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
            <li className="liForServers z-10" key={server.serverID}>
                <ServerButton src={server.imgsrc} link={server.serverID} socket={socket} setChannels={setChannels} />
            </li>
        );
    } else {
        listOfServers = <div></div>
    }
    return (
        <ul className="ulForServers">
            <li className='liForServers' key={"homeButton"}>
                <Link to={'/channels/friends'}>
                    <div className='btn btn-primary tooltip'>
                        <img className="serverButton trans hover:rounded-[15px]" alt='' src={'/discord-logo.png'} />
                        <div className='right'><h3>Server Test</h3><i></i></div>
                    </div>
                </Link>
            </li>
            <div className='border-b-2 pt-3 w-2/5 m-auto border-[#373a3f]' />
            {listOfServers}
            <li className="liForServers">
                <CreateServer show={showmod} handleClose={hideModal} setServers={setServers} servers={servers} />
                <button type="button" onClick={showModal}>
                    <img className="serverButton trans hover:rounded-[15px]" alt='' src={'/create-plus.png'} />
                </button>
            </li>
        </ul>
    )
}

export default Header;