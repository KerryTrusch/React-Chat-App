import Header from "./ServerBar/header";
import Sidebar from "./DMSAndChannels/Sidebar";
import ChatArea from "./ChatArea/ChatArea";

export default function ChatView({servers, setServers, client}) {
    return (
        <div className="flex w-full h-full overflow-hidden">
            <Header servers={servers} setServers={setServers} socket={client} />
            <Sidebar />
            <ChatArea socket={client} />
        </div>
    )
}