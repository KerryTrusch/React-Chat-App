import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Login.css";
async function regUser(credentials) {
    return fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        const res = await regUser({
            username,
            password
        });
        document.getElementById('Password').value = '';
        document.getElementById('Username').value = '';
        if (res.Condition === 'SUCCESS') navigate("/success", { replace: true });
    }

    return (
        <div className="w-full h-screen">
            <div className="fixed top-[50%] left-[50%] transform-x-[-50%] transform-y-[-50%]">
                <div className="bg-[#36393f] rounded">
                    <form className="p-8 text-lg" onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-center text-center">
                            <h2 className='text-white font-bold m-0'>Creating an account is simple!</h2>
                            <h3 className='text-[#72767d] font-bold text-base'>Please enter a unique username and password to create an account</h3>
                            <span id="error_text" style={{display: 'none', color: 'red'}}> Username or password is not of the correct form. They must be between 8-15 characters in length, be alphanumeric and only contain the special characters @*# </span>
                            <label className="text-[#b9bbbe] text-left mb-2" htmlFor="Username">Enter a username</label>
                            <input id="Username" onChange={e => setUsername(e.target.value)} />
                            <label className="text-[#b9bbbe] text-left mb-2" htmlFor="Password">Enter a password</label>
                            <input id="Password" type="password" onChange={e => setPassword(e.target.value)} />
                            <button type="submit" className="loginButton">Create account</button>
                            <h5>Already have an account? <Link to="/login">Login here</Link></h5>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;