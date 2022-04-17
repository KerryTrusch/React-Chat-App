import "./ChatMessageBar.css";

function ChatMessageBar(props) {
    return (
            <form className="MessageForm">
                <div className="MessageBar">
                    <input className="MessageInput" placeholder={"Message @" + props.name }/>
                </div>
            </form>
    )
}

export default ChatMessageBar;