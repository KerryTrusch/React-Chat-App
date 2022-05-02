import './CreateServerModal.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

async function makeServer(data) { 
    return fetch("http://localhost:5000/createserver", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(data => data.json())
}

function CreateServer({ handleClose, show }) {
    const navigate = useNavigate();
    const [serverName, setServerName] = useState();
    const handleCreation = async e => {
        e.preventDefault();
        const token = JSON.parse(sessionStorage.getItem('token')).token;
        const condition = await makeServer({
            token,
            serverName
        })
        console.log(condition.Condition);
        if (condition.Condition == "SUCCESS") {
            handleClose()
            navigate('')
        }
    }   

    const showHideClassName = show ? "ServerModal display-block" : "ServerModal display-none";
    return (
        <div className={showHideClassName} onClick={handleClose}>
            <div className="ServerModal-main" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleCreation}>
                <div className="ServerModal-inner">
                    <h2>Create a server</h2>
                    <h5>Creating a place for your friends to hangout is simple. Enter a name and you're all good to go.</h5>
                    <label htmlFor="ServerName"><small>SERVER NAME</small></label>
                    <input id="ServerName" autoComplete='name' onChange={e => setServerName(e.target.value)}/>
                </div>
                <div className="ServerModal-footer">
                    <button type="submit">
                        Create
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CreateServer;