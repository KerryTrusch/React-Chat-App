import Header from "./ServerBar/header";
import Sidebar from "./DMSAndChannels/Sidebar";
import FriendsTab from "./Friends/FriendsTab";

export default function Home({ servers, setServers, client }) {
    return (
        <div className="flex w-full h-full overflow-hidden">
            <Header servers={servers} setServers={setServers} socket={client} />
            <Sidebar />
            <FriendsTab />
        </div>
    )
}