import { useState } from "react"


export default function User({name, userID, pfpSrc, status}) {
    const [usersID, setUsersID] = useState(userID);
    return (
        <div className="flex px-2 py-1 hover:bg-[#42464d] cursor-pointer">
            <div className="h-9 w-9 rounded-[30px] my-auto">
                <img src={`/${pfpSrc}`} className="rounded-[30px]" alt="user profile"/>
            </div>
            <span className="text-[#96989d] font-medium my-auto ml-3">
                {name}
            </span>
        </div>
    )
}