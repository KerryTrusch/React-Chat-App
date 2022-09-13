function ChatMessage({ source }) {
    return (
        <div className="flex mb-4 p-1.5 ml-3.5">
            <div className="flex">
                <img className="block rounded-[99px] h-[36px] w-[36px] mr-2.5 object-cover" src={`/${source.src}`} alt=''/>
                <div className="flex flex-col">
                    <div className="flex justify-start">
                        <span className="font-sans text-white mr-2">{source.name}</span>
                        <small className="text-[#a3a6aa]">{source.timestamp}</small>
                    </div>
                    <div className="mt-1 text-[#DCDDDE] font-sans">
                        {source.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessage;