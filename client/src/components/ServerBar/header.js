import CreateServer from './CreateServerModal';
import ServerButton from './ServerButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
function Header({ servers, setServers, socket, setChannels, setMessageList, setServerinfo }) {
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
            <li className="flex align-center justify-center mt-2.5 z-10" key={server.serverID}>
                <ServerButton src={"discord-pfp.png"} link={server.serverID} socket={socket} setChannels={setChannels} setMessageList={setMessageList} setServerinfo={setServerinfo}/>
            </li>
        );
    } else {
        listOfServers = <div></div>
    }
    return (
        <ul className="bg-[#202225] m-0 p-0 overflow-x-hidden overflow-y-scroll w-[75px] h-full list-none scrollNone">
            <li className='flex align-center justify-center mt-2.5' key={"homeButton"}>
                <div>
                    <Link to={'/channels/friends'} onMouseEnter={() => setShowDMTip(true)} onMouseLeave={() => setShowDMTip(false)} data-tip data-for='DM'>
                        <img className="relative h-[46px] h-[46px] block object-cover rounded-[30px] trans hover:rounded-[15px] transition-[border-radius] duration-200" alt='' src={'/discord-logo.png'} data-tip data-for='DM'/>
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
            <li className="flex align-center justify-center mt-2.5">
                <CreateServer show={showmod} handleClose={hideModal} setServers={setServers} servers={servers} />
                <div>
                    <button className="border-none color-white bg-[#202225] cursor-pointer" type="button" onClick={showModal} onMouseEnter={() => setShowModalTip(true)} onMouseLeave={() => setShowModalTip(false)} data-tip data-for='CreateServer'>
                        <img className="relative h-[46px] h-[46px] block object-cover rounded-[30px] trans hover:rounded-[15px] transition-[border-radius] duration-200" alt='' src={'/create-plus.png'} data-tip data-for='CreateServer' />
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