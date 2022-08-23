import './header.css';
import './ServerButton.css';
import CreateServer from './CreateServerModal';
import ServerButton from './ServerButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
function Header({ servers, setServers, socket, setChannels }) {
    const [showmod, setShowmod] = useState();
    const [showDMTip, setShowDMTip] = useState(false);
    const [showModalTip, setShowModalTip] = useState(false);
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
                <div>
                    <Link to={'/channels/friends'} onMouseEnter={() => setShowDMTip(true)} onMouseLeave={() => setShowDMTip(false)} data-tip data-for='DM'>
                        <img className="serverButton trans hover:rounded-[15px]" alt='' src={'/discord-logo.png'} data-tip data-for='DM'/>
                    </Link>
                    <div className={`${showDMTip ? "block" : "hidden"}`} >
                        <ReactTooltip id='DM' place='right' effect='solid' backgroundColor='#000000'>
                            Direct Messages
                        </ReactTooltip>
                    </div>
                </div>
            </li>
            <div className='border-b-2 pt-3 w-2/5 m-auto border-[#373a3f]' />
            {listOfServers}
            <li className="liForServers">
                <CreateServer show={showmod} handleClose={hideModal} setServers={setServers} servers={servers} />
                <div>
                    <button type="button" onClick={showModal} onMouseEnter={() => setShowModalTip(true)} onMouseLeave={() => setShowModalTip(false)} data-tip data-for='CreateServer'>
                        <img className="serverButton trans hover:rounded-[15px]" alt='' src={'/create-plus.png'} data-tip data-for='CreateServer' />
                    </button>
                    <div className={`${showModalTip ? "block" : "hidden"}`} >
                        <ReactTooltip id='CreateServer' place='right' effect='solid' backgroundColor='#000000'>
                            Create a server
                        </ReactTooltip>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Header;