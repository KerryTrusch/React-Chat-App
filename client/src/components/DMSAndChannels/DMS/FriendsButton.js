import "./FriendsButton.css";
import {Link} from 'react-router-dom';
function FriendsButton(props) {
    return (
        <div className="DMWrapper">
            <Link className="DMContainer" to={`/channels/${props.link}`}>
                <div className="DMPFPContainer">
                    <img src={props.src} alt='' className="DMPic" />
                </div>
                <div className="DMSpanWrapper">
                    <span className="DMSpan">{props.name}</span>
                </div>
            </Link>
        </div>
    )
}

export default FriendsButton;