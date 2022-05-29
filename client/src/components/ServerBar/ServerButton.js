import './ServerButton.css';
import {Link, useNavigate} from 'react-router-dom';
function ServerButton(props) {
    let navigate = useNavigate();
    const handleClick = e => {
        e.preventDefault();
        var url = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
        if (url === 'channels') {
            url = 0
        }
        const obj = {op: 1, newServer: props.link, oldServer: url, token: JSON.parse(sessionStorage.getItem('token'))}
        props.socket.send(JSON.stringify(obj))
        navigate(`/channels/${props.link}`);
    }
    return (
        <Link to={`/channels/${props.link}`} onClick={handleClick}>
            <img className="serverButton" onerror="this.src='discord-pfp.png" alt='' src={props.src} />    
        </Link>
    )
}

export default ServerButton;