import ChannelButton from './ChannelButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ChannelDropDown from './ChannelDropDown';
export default function ChannelBar({channels, serverName, setChannels, setMessageList, loadMessages}) {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className="min-h-0 w-60 bg-[#2f3136] grow-0 shrink-0 basis-auto max-h-full">
            <div className="hover:bg-[#42464d] h-12 px-2.5 my-auto w-full flex align-center justify-center pl-5 text-white font-bold border-b border-[#202225] cursor-pointer" onClick={() => setShowDropdown((prev) => !prev)}>
                <div className="flex flex-col justify-center">
                    {serverName}
                </div>
                <div className="ml-20 my-auto">
                    {showDropdown ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faAngleDown} /> }
                </div>
            </div>
            <div className={`${showDropdown ? "visible" : "invisible"}`}>
                <ChannelDropDown setShowDropdown={setShowDropdown} setChannels={setChannels} channels={channels}/>
            </div>
            <div className="h-[calc(100%_-_100px)] flex-1 grow-1 basis-auto">
                <ul className="h-full max-h-[calc(100%_-_100px)]">
                    <div className='p-4' key="servers">
                        {channels.map((info) => 
                            <ChannelButton channelID={info.channelID} name={info.name} key={info.pos_order} setMessageList={setMessageList} loadMessages={loadMessages}/>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    )
}