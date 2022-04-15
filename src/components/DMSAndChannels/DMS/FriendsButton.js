import "./FriendsButton.css";
function FriendsButton(props) {
    return (
        <div className="DMWrapper">
            <a className="DMContainer" href="#">
                <div className="DMPFPContainer">
                    <img src={props.src} className="DMPic" />
                </div>
                <div className="DMSpanWrapper">
                    <span className="DMSpan">{props.name}</span>
                </div>
            </a>
        </div>
    )
}

export default FriendsButton;