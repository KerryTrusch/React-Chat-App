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
        <div className="flex relative overflow-hidden shrink-1 grow-1 basis-auto min-h-0 min-w-0 z-0">
            <div className="absolute top-0 right-0 bottom-0 left-0 overflow-x-hidden overflow-y-scroll min-h-0" id="TextWallOuter">
                <div className="flex min-h-full flex-col justify-end shrink-1 grow-1 basis-auto items-stretch" id="TextWall">
                    {messages}
                </div>
            </div>
        </div>
    )
}

export default TextArea;