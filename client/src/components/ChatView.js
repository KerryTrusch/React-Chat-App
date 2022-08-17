import ChatArea from "./ChatArea/ChatArea";
import ChannelBar from "./DMSAndChannels/Channels/Channels";
export default function ChatView({client, channels}) {
    return (
        <div className="flex w-full h-full overflow-hidden">
            <ChannelBar channels={channels} />
            <ChatArea socket={client} />
        </div>
    )
}