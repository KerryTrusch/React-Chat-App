import ChannelButton from './ChannelButton';

export default function ChannelBar({channels, serverName}) {

    return (
        <div className="min-h-0 w-60 bg-[#2f3136] grow-0 shrink-0 basis-auto max-h-full">
            <div className="h-12 z-2 px-2.5 m-auto w-full flex flex-col align-center justify-center pl-5 text-white font-bold border-b border-[#202225]">
                {serverName}
            </div>
            <div className="h-[calc(100%_-_100px)] flex-1 grow-1 basis-auto">
                <ul className="h-full max-h-[calc(100%_-_100px)]">
                    <div className='p-4' key="servers">
                        {channels.map((info) => 
                            <ChannelButton channelID={info.channelID} name={info.name} key={info.pos_order}/>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    )
}