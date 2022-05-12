import "./ChatArea.css";
import ChatMessageBar from "./ChatMessageBar/ChatMessageBar";
import TextArea from "./TextArea/TextArea";
function ChatArea({socket}) {
    return (
        <div className="ChatWrapper">
            <TextArea />
            <ChatMessageBar name="Forodin" socket={socket}/>
        </div>
    )
}

export default ChatArea;