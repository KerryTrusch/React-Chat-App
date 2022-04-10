import './ServerButton.css';
function ServerButton(props) {
    return (
        <a href={props.link}>
            <img className="serverButton" src="logo192.png" />    
        </a>
    )
}

export default ServerButton;