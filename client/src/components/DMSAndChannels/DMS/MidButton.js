import "./MidButton.css";
import {Link} from 'react-router-dom';
function MidButton(props) {
    return (
        <div className="MidButtonWrapper">
            <Link to="/channels/friends" className="MidButtonContainer" >
                <div className="MidButtonSVG">
                    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" fillRule="evenodd">
                            <path fill="currentColor" fillRule="nonzero" d={props.svgLink} transform="translate(0 4)"></path>
                        </g>
                    </svg>
                </div>
                <div className="MidButtonSpanWrapper">
                    <span className="MidButtonSpan"> {props.name}</span>
                </div>
            </Link>
        </div>
    )
}

export default MidButton;