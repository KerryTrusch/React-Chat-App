import './ServerButton.css';
import { Link, useNavigate } from 'react-router-dom';

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
    let navigate = useNavigate();
    const handleClick = async e => {
        e.preventDefault();
        var oldServerID = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
        if (oldServerID === 'channels') {
            oldServerID = 0
        }
        const obj = { op: 1, newRoom: link, oldRoom: oldServerID, token: JSON.parse(sessionStorage.getItem('token')) }
        socket.send(JSON.stringify(obj));
        const serverID = link;
        const channels = await getChannels({serverID});
        setChannels(channels);
        navigate(`/channels/${link}/${channels[0].channelID}`);
    }
    return (
        <Link to={`/channels/${link}`} onClick={handleClick}>
            <img className="serverButton" alt='' src={`/${src}`} />
        </Link>
    )
}

export default ServerButton;