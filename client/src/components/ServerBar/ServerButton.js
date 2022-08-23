import './ServerButton.css';
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

function ServerButton({ src, link, socket, setChannels }) {
    const [show, setShow] = useState(false)
    let navigate = useNavigate();
    const handleClick = async e => {
        e.preventDefault();
        const serverID = link;
        const channels = await getChannels({ serverID });
        const obj = { op: 1, newServer: channels[0].channelID, token: JSON.parse(sessionStorage.getItem('token')).token }
        socket.send(JSON.stringify(obj));
        setChannels(channels);
        navigate(`/channels/${link}/${channels[0].channelID}`);
    }
    return (
        <div>
            <Link to={`/channels/${link}`} onClick={handleClick} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} data-tip data-for='tip'>
                <img className="serverButton trans hover:rounded-[15px]" alt='' src={`/${src}`} data-tip data-for='tip' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}/>
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