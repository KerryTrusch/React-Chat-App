import "./ChatMessageBar.css";
function ChatMessageBar({name, setBody, createMessage}) {
    return (
            <form className="MessageForm" onSubmit={(e) => {e.preventDefault(); document.getElementById('inputbar').value = ''; createMessage()}}>
                <div className="MessageBar">
                    <input className="MessageInput" id="inputbar" onChange={e => {setBody(e.target.value)}} placeholder={"Message @" + {name} }/>
                </div>
            </form>
    )
}

export default ChatMessageBar;