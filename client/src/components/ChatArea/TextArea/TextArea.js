import { useEffect, useState } from "react";
import "./TextArea.css";
function TextArea({rawmessages}) {
    const [visualmessages, setVisualmessages] = useState([])
        useEffect(() => {
            
        }, [rawmessages])
        return (
        <div className="TextWrapper">
            <div className="TextContent">
                {visualmessages}
            </div>
        </div>
    )
}

export default TextArea;