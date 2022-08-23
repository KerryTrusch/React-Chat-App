import Sidebar from "./DMSAndChannels/Sidebar";
import FriendsTab from "./Friends/FriendsTab";

export default function Home() {
    return (
        <div className="flex w-full h-full">
            <Sidebar />
            <FriendsTab />
        </div>
    )
}