import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import TextArea from "./TextArea/TextArea";
function ChatArea() {
    return (
        <div className="ChatWrapper">
            <TextArea />
            <ChatMessageBar name="Forodin" />
        </div>
    )
}

export default ChatArea;