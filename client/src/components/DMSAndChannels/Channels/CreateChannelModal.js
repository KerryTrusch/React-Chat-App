import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


async function createChannel(serverID) {
    return fetch("http://localhost:8000/createchannel", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serverID)
    })
        .then(data => data.json())
} 

export default function CreateChannelModal({ setShowChannel, setChannels, channels }) {
    const [channelName, setChannelName] = useState("");

    async function handleClick() {
        const pos = channels.length;
        const serverID = window.location.pathname.split('/')[2];
        const newChannel = await createChannel({serverID, channelName, pos});
        setChannels(prev => [...prev, newChannel[0]]);
    }

    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-black/60" onClick={() => { setShowChannel(false); }}>
            <div className="absolute top-[50%] left-[50%] w-[500px] flex flex-col bg-[#36393f] translate-y-[-50%] translate-x-[-50%] opacity-100 rounded-lg" onClick={e => e.stopPropagation()} >
                <div className="flex w-full p-3">
                    <h1 className="text-2xl text-white mb-5">
                        Create Channel
                    </h1>
                    <div className="ml-auto cursor-pointer text-[#96989d] text-lg" onClick={() => { setShowChannel(false); }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <form className="">
                    <div className='px-3'>
                        <label for="input" className='text-[#DDDDDD] uppercase text-xs font-bold'>
                            Channel Name
                        </label><br></br>
                        <div className='flex bg-[#202225] text-white'>
                            <FontAwesomeIcon icon={faHashtag} className="my-auto text-white pl-2"/>
                            <input id="input" placeholder='new-channel' className='mt-1 bg-[#202225] p-2 rounded my-auto' onChange={e => setChannelName(e.target.value)}/>
                        </div> 
                    </div>
                    <div className="flex justify-center align-center mt-4 bg-[#2f3136] p-3 rounded-br-lg rounded-bl-lg">
                        <div className="text-white text-md my-auto ml-auto cursor-pointer mr-4" onClick={() => { setShowChannel(false); }}>
                            Cancel
                        </div>
                        <button className='cursor-pointer flex flex-col align-center p-3 rounded text-white border-none bg-[#5865f1]' onClick={(e) => {e.preventDefault(); handleClick();}}>
                            Create Channel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}