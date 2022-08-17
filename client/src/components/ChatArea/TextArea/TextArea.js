import "./TextArea.css";
import ChatMessage from "./ChatMessage";
import { useEffect } from "react";
function TextArea({ messageList }) {
    let messages = messageList.map((info) =>
        <ChatMessage source={info} key={info.key} />
    );

    useEffect(() => {
        let ele = document.getElementById("TextWallOuter");
        ele.scrollTop = ele.scrollHeight;
    }, [messageList])

    return (
        <div className="TextWrapper">
            <div className="absolute top-0 right-0 bottom-0 left-0 overflow-x-hidden overflow-y-scroll min-h-0" id="TextWallOuter">
                <div className="TextContent" id="TextWall">
                    {messages}
                </div>
            </div>
        </div>
    )
}

export default TextArea;