import './ChatMessage.css';

function ChatMessage({ source }) {
    return (
        <div className="messageWrapper">
            <div className="messageInner">
                <img src={source.src} />
                <div className="messageNameAndBodyWrapper">
                    <div>
                        <span>{source.name}</span>
                        <small>{source.time}</small>
                    </div>
                    <div className="messageBody">
                        {source.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessage;