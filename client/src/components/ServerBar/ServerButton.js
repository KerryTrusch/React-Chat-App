import './ServerButton.css';
import {Link, useNavigate} from 'react-router-dom';

async function getMessages(server) {
    return fetch('http://localhost:8000/getservermessages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(server)
    })
        .then(data => data.json())
}

function ServerButton(props) {
    let navigate = useNavigate();
    const handleClick = async e => {
        e.preventDefault();
        props.setMessages([]) //First, set messages to empty array so that a useEffect gets called with change in messages
        var url = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
        if (url === 'channels') {
            url = 0
        }
        const obj = {op: 1, newServer: props.link, oldServer: url, token: JSON.parse(sessionStorage.getItem('token'))}
        props.socket.send(JSON.stringify(obj))
        const link = props.link
        const messages = await getMessages({link})
        console.log(messages)
        props.setMessages(messages)
        navigate(`/channels/${props.link}`);
    }
    return (
        <Link to={`/channels/${props.link}`} onClick={handleClick}>
            <img className="serverButton" onerror="this.src='discord-pfp.png" alt='' src={props.src} />    
        </Link>
    )
}

export default ServerButton;