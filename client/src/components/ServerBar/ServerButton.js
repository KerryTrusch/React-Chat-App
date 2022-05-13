import './ServerButton.css';
import {Link} from 'react-router-dom';
function ServerButton(props) {
    const handleClick = () => {
        obj = {op: 1, room: props.link}
    }
    return (
        <Link to={`/channels/${props.link}`} onClick={}>
            <img className="serverButton" alt='' src={props.src} />    
        </Link>
    )
}

export default ServerButton;