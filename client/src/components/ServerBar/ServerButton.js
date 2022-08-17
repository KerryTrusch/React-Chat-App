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
        const serverID = link;
        const channels = await getChannels({serverID});
        const obj = { op: 1, newServer: channels[0].channelID, token: JSON.parse(sessionStorage.getItem('token')).token }
        socket.send(JSON.stringify(obj));
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