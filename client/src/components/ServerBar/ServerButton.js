import './ServerButton.css';
import {Link} from 'react-router-dom';
function ServerButton(props) {
    return (
        <Link to={props.link}>
            <img className="serverButton" alt='' src={props.src} />    
        </Link>
    )
}

export default ServerButton;