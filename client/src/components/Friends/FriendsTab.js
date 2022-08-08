import "./FriendsTab.css";
import { useState } from "react";
export default function FriendsTab() {
    const [friends, setFriends] = useState([]);
    return (
        <div className="FriendsMenuWrapper">
            <div className="FriendsMenuHeader">
                <div className="w-full bg-[#36393f]">
                    <div className="flex border-none py-2.5 ml-5" >
                        <div className="flex flex-none mr-2 text-[#96989d]">
                            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(0 4)"></path>
                                </g>
                            </svg>
                        </div>
                        <span className="text-white font-bold my-auto"> Friends </span>
                        <div className="border-r border-zinc-600 pl-5"/>
                        <button className="border-none rounded text-white ml-5 bg-[#40444b] px-3 hover:cursor-pointer">
                            All
                        </button>
                    </div>
                    <div className="BorderUnderSearch mt-1" />
                </div>
            </div>
            <div className="flex w-full">
                <div className="flex flex-col basis-4/5 grow-0 shrink-0 py-5 px-8 ">
                    <input className="w-full bg-[#1f2021] rounded p-1.5 text-white mb-10" placeholder="Search"/>
                    <small className="text-[#9a9da1]">
                        ALL FRIENDS - {friends.length}
                    </small>
                </div>
                <div className="border-l border-zinc-600 basis-1/5">

                </div>
            </div>
        </div>
    )
}