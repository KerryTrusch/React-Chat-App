import "./TextArea.css";
function TextArea({messages}) {
        return (
        <div className="TextWrapper">
            <div className="TextContent">
                {messages}
            </div>
        </div>
    )
}

export default TextArea;