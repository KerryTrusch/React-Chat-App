import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

async function regUser(credentials) {
    return fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}

const verifyLogin = (input) => {
    return /^([a-zA-Z0-9@*#]{8,15})$/.test(input);
}

function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        if (verifyLogin(username) && verifyLogin(password)) {
            const res = await regUser({
                username,
                password
            });
            console.log(res);
            document.getElementById('Password').value = '';
            document.getElementById('Username').value = '';
            if (res.status === 200) navigate("/success", { replace: true });
            else if (res.status === 404) {
                const text = document.getElementById('error_text');
                text.style.display = "block";
                text.innerHTML = "Username is already in use"
            }
        } else {
            const text = document.getElementById('error_text');
            text.style.display = "block";
            text.innerHTML = "Username or password is not of the correct form. They must be between 8-15 characters in length, be alphanumeric and only contain the special characters @*#";
        }

    }

    return (
        <div className="loginWrapper" style={{backgroundImage: `url(miku_background.jpg)`, backgroundSize: 'cover'}}>
            <div className="loginWrapperCenter">
                <div className="loginInnerWrapper">
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="innerFormLogin">
                            <h2>Creating an account is simple!</h2>
                            <h3>Please enter a unique username and password to create an account</h3>
                            <span id="error_text" style={{display: 'none', color: 'red'}}> Username or password is not of the correct form. They must be between 8-15 characters in length, be alphanumeric and only contain the special characters @*# </span>
                            <label htmlFor="Username">Enter a username</label>
                            <input id="Username" onChange={e => setUsername(e.target.value)} />
                            <label htmlFor="Password">Enter a password</label>
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