import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import DDInviteModal from './DDInviteModal';
import CreateChannelModal from './CreateChannelModal';
import { useEffect, useState } from 'react';
export default function ChannelDropDown({ setShowDropdown, setChannels, channels }) {
    const [showInvite, setShowInvite] = useState(false);
    const [showChannel, setShowChannel] = useState(false);
    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen z-50" onClick={() => setShowDropdown(false)}>
                <div className="absolute top-[56px] left-[82px]" onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col relative w-[220px] bg-[#18191c] px-1.5 rounded py-2">
                        <div className="text-[#96989d]">
                        </div>
                        <button className="text-[#545ed1] flex text-sm w-full hover:bg-[#4751c4] hover:text-white p-1 rounded-sm cursor-pointer border-none" onClick={() => { setShowDropdown(false); setShowInvite(true); }}>
                            <span className="" >
                                Invite People
                            </span>
                            <div className="ml-auto">
                                <FontAwesomeIcon icon={faUserPlus} />
                            </div>
                        </button>
                        <button className="text-[#96989d] flex text-sm w-full hover:bg-[#4751c4] hover:text-white p-1 rounded-sm cursor-pointer border-none" onClick={() => { setShowDropdown(false); setShowChannel(true); }}>
                            <span className="">
                                Create Channel
                            </span>
                            <div className="ml-auto mr-[3px]">
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${showInvite ? "visible" : "invisible"}`}>
                <DDInviteModal setShowInvite={setShowInvite} />
            </div>
            <div className={`${showChannel ? "visible" : "invisible"}`}>
                <CreateChannelModal setShowChannel={setShowChannel} setChannels={setChannels} channels={channels}/>
            </div>
        </div>
    )
}