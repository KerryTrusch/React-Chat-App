import { Link, useNavigate } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import { useState } from 'react';
async function getChannels(serverID) {
    return fetch("http://localhost:8000/getchannels", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serverID)
    })
        .then(data => data.json())
}

async function loadMessages(channelID) {
    return fetch('http://localhost:8000/getmessages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(channelID)
    })
        .then(data => data.json());
}

async function loadServerInfo(serverID) {
    return fetch('http://localhost:8000/getserverinfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serverID)
    })
        .then(data => data.json());
}

function ServerButton({ src, link, socket, setChannels, setMessageList, setServerinfo }) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClick = async e => {
        const serverID = link;
        const channels = await getChannels({ serverID });
        const channelID = channels[0].channelID;
        const obj = { op: 1, newServer: channels[0].channelID, token: JSON.parse(sessionStorage.getItem('token')).token }
        socket.send(JSON.stringify(obj));
        setChannels(channels);
        const messages = await loadMessages({channelID});
        setMessageList(messages);
        const inf = await loadServerInfo({link});
        setServerinfo(inf);
        navigate(`${link}/${channelID}`);
    }
    return (
        <div>
            <Link to={`/channels/${link}`} onClick={handleClick} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} data-tip data-for='tip'>
                <img className="relative h-[46px] h-[46px] block object-cover rounded-[30px] trans hover:rounded-[15px] transition-[border-radius] duration-200" alt='' src={`/${src}`} data-tip data-for='tip' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}/>
            </Link>
            <div className={`${show ? "block" : "hidden"}`} >
                <ReactTooltip id='tip' place='right' effect='solid' backgroundColor='#000000'>
                    Test
                </ReactTooltip>
            </div>
        </div>
    )
}

export default ServerButton;