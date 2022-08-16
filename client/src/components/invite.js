import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


async function joinServer(id) {
    return fetch("http://localhost:8000/joinserver", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(data => data.json())
}


export default function Invite() {


    const serverID = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    const navigate = useNavigate();
    useEffect(() => {
        const join = async () => {
            const token = JSON.parse(sessionStorage.getItem('token')).token;
            const status = await joinServer({token, serverID});
            navigate('/channels/'+serverID, {replace: true});
        }
        join();
    }, [])

    return <div />
}