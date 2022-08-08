import './ChatMessage.css';

function ChatMessage({ source }) {
    return (
        <div className="messageWrapper">
            <div className="messageInner">
                <img src={`/${source.src}`} alt=''/>
                <div className="messageNameAndBodyWrapper">
                    <div className="nameAndTime">
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