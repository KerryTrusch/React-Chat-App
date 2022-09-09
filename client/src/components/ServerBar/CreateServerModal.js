import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

async function makeServer(data) { 
    return fetch("http://localhost:8000/createserver", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(data => data.json())
}

function CreateServer({ handleClose, show, setServers, servers }) {
    const [serverName, setServerName] = useState();
    const handleCreation = async e => {
        e.preventDefault();
        const token = JSON.parse(sessionStorage.getItem('token')).token;
        const res = await makeServer({
            token,
            serverName
        });
        if (res.status === 200) {
            handleClose();
        }
    }   

    return (
        <div className={`${show ? "block" : "hidden"} fixed top-0 left-0 w-full h-full z-10 bg-black/[0.6]`} onClick={handleClose}>
            <div className="flex flex-col fixed top-[50%] left-[50%] w-[400px] bg-white rounded h-auto translate-x-[-50%] translate-y-[-50%]" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleCreation}>
                <div className="flex flex-col p-2.5 text-center">
                    <h2 className='m-0 mb-2.5 font-normal text-[#72767d]'>Create a server</h2>
                    <h5 className='m-0 mb-2.5'>Creating a place for your friends to hangout is simple. Enter a name and you're all good to go.</h5>
                    <label className='text-left text-[#72767d] font-medium' htmlFor="ServerName"><small>SERVER NAME</small></label>
                    <input className="px-2.5 py-1.5 bg-[#d3d3d3] border-none rounded-sm" id="ServerName" autoComplete='name' onChange={e => setServerName(e.target.value)}/>
                </div>
                <div className="flex justify-center align-center rounded mt-[20px] bg-[#dddcdc] px-4 py-0">
                    <button className="flex flex-col align-center my-2 p-1.5 w-[100px] rounded bg-[#5865f1] text-[#fff] border-none h-[40px] cursor-pointer" type="submit">
                        Create
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CreateServer;