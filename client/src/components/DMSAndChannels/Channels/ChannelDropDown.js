import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
export default function ChannelDropDown({setShowDropdown}) {

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50" onClick={() => setShowDropdown(false)}>
            <div className="absolute top-[56px] left-[82px]" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col relative w-[220px] bg-[#000000] px-1.5 rounded py-2">
                    <div className="text-[#96989d]">
                    </div>
                    <div className="text-blue-500 flex text-sm w-full hover:bg-blue-600 hover:text-white p-1 rounded-sm cursor-pointer">
                        <span className="">
                            Invite People
                        </span>
                        <div className="ml-auto">
                            <FontAwesomeIcon icon={faUserPlus} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}