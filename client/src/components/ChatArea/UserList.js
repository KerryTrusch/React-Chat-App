

export default function UserList({users_online}) {

    return (
        <div className="flex flex-col h-full bg-[#2f3136]">
            <div className="flex min-w-60 justify-center max-h-full">
                <div className="w-60 pb-5 grow-0 shrink-0 basis-auto h-auto">
                    <h2 className="pt-6 pr-2 pl-4 h-10 truncate uppercase text-xs font-medium text-[#96989d]">
                        <span aria-hidden={true}>
                            Online - {users_online}
                        </span>
                    </h2>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}