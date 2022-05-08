import "./TextArea.css";
import ChatMessage from "./ChatMessage";
function TextArea() {
    var testData = {"src": "discord-pfp.png", "name":"test", "time": "11:59 PM", "body":"this is a test message"}
    return (
        <div className="TextWrapper">
            <div className="TextContent">
                <ChatMessage source={testData} />
            </div>
        </div>
    )
}

export default TextArea;