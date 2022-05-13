import './ServerButton.css';
import {Link, useNavigate} from 'react-router-dom';
function ServerButton(props) {
    let navigate = useNavigate();
    const handleClick = e => {
        e.preventDefault();
        const obj = {op: 1, room: props.link}
        props.socket.send(JSON.stringify(obj))
        navigate(`/channels/${props.link}`);
    }
    return (
        <Link to={`/channels/${props.link}`} onClick={handleClick}>
            <img className="serverButton" alt='' src={props.src} />    
        </Link>
    )
}

export default ServerButton;