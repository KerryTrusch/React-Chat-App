import "./TextArea.css";
import ChatMessage from "./ChatMessage";
function TextArea({ messageList }) {
    let messages = messageList.map((info) =>
        <ChatMessage source={info} key={info.key} />
    );
    return (
        <div className="TextWrapper">
            <div className="absolute top-0 right-0 bottom-0 left-0 overflow-x-hidden overflow-y-scroll min-h-0">
                <div className="TextContent">
                    {messages}
                </div>
            </div>
        </div>
    )
}

export default TextArea;