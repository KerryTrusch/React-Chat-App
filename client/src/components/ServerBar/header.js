import './header.css';
import './ServerButton.css';
import CreateServer from './CreateServerModal';
import ServerButton from './ServerButton';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
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
                <ServerButton src={server.imgsrc} link={server.serverID} socket={socket} className="serverButton" />
            </li>
        );
    } else {
        listOfServers = <div></div>
    }
    return (
        <div>
            <ul className="ulForServers">
                <li className='liForServers' key={"homeButton"}>
                    <Link to={'/channels/friends'}>
                        <img className="serverButton" alt='' src={'/discord-logo.png'} />
                    </Link>
                </li>
                <div className='border-b-2 pt-3 w-2/5 m-auto border-[#373a3f]'>

                </div>
                {listOfServers}
                <li className="liForServers">
                    <CreateServer show={showmod} handleClose={hideModal} setServers={setServers} servers={servers} />
                    <button type="button" onClick={showModal}>
                        <img className="serverButton" alt='' src={'/create-plus.png'} />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Header;