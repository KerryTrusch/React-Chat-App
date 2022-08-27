import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export default function DDInviteModal({ serverID, setShowInvite }) {
    const [clicked, setClicked] = useState(false);
    const link = "https://localhost:3000/invite/" + serverID;
    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-black/60" onClick={() => {setShowInvite(false); setClicked(false)}}>
            <div className="absolute top-[50%] left-[50%] w-[500px] flex flex-col bg-[#36393f] translate-y-[-50%] translate-x-[-50%] opacity-100 p-3 rounded" onClick={e => e.stopPropagation()} >
                <div className="flex w-full">
                    <h3 className="text-md text-white mb-5">
                        Invite friends to your server
                    </h3>
                    <div className="ml-auto cursor-pointer text-[#96989d] text-lg" onClick={() => {setShowInvite(false); setClicked(false); }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="bg-[#202225] rounded w-full p-1 flex">
                    <div className="text-white text-md my-auto">
                        {link}
                    </div>
                    <button className={`border-none ml-auto text-center px-5 py-2 ${clicked ? "bg-green-400" : "bg-[#4751c4]"} rounded text-white cursor-pointer`} onClick={() => { navigator.clipboard.writeText(link); setClicked(true); }} >
                        {clicked ? "Copied" : "Copy"}
                    </button>
                </div>
            </div>
        </div>
    )
}