import "./Login.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';

async function loginUser(credentials) {
    return fetch('https://jgpi0srldj.execute-api.us-east-1.amazonaws.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json());
}

const verifyLogin = (input) => {
    return /^([a-zA-Z0-9@*#]{8,15})$/.test(input);
}
function Login({ setToken, setGlobal }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        if (verifyLogin(username) && verifyLogin(password)) {
            const error_text = document.getElementById('error_text');
            error_text.style.display = "none";
            const token = await loginUser({
                username,
                password
            });
            if (token) {
                sessionStorage.setItem('uname',  username);
            }
            setToken(token);
        } else {
            const error_text = document.getElementById('error_text');
            error_text.style.display = "block";
        }
    }
    return (
        <div className="w-screen h-screen bg-blue-400">
            <div className="loginWrapperCenter">
                <div className="loginInnerWrapper">
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="innerFormLogin">
                            <h2>Welcome back!</h2>
                            <h3>Please enter your credentials to login.</h3>
                            <span id="error_text" style={{color: 'red', display: 'none'}}> Username or password is incorrect </span> 
                            <label htmlFor="Username">Username</label>
                            <input id="Username" autoComplete="username" onChange={e => setUsername(e.target.value)} />
                            <label htmlFor="Password">Password</label>
                            <input id="Password" type="password" autoComplete="password" onChange={e => setPassword(e.target.value)} />
                            <button type="submit" className="loginButton">Login</button>
                            <h5>Don't have an account? <Link to="/register">Register</Link></h5>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;