import './ServerButton.css';
function ServerButton(props) {
    return (
        <a href={props.link}>
            <img className="serverButton" src={props.src} />    
        </a>
    )
}

export default ServerButton;