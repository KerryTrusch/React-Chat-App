import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
        <div className="loginWrapper">
            <div className="loginWrapperCenter">
                <div className="loginInnerWrapper">
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="innerFormLogin">
                            <h2>Creating an account is simple!</h2>
                            <h3>Please enter a unique username and password to create an account</h3>
                            <label htmlFor="Username">Enter a username</label>
                            <input id="Username" onChange={e => setUsername(e.target.value.trim())} />
                            <label htmlFor="Password">Enter a password</label>
                            <input id="Password" type="password" onChange={e => setPassword(e.target.value.trim())} />
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