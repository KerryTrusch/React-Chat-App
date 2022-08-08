import {useNavigate} from 'react-router-dom';
import './Login.css';
function AccSuccess() {
    let navigate = useNavigate();
    setTimeout(function() {
        navigate('/login', {replace: true});
      }, 5000);

    return (
        <div className="loginWrapper" style={{backgroundImage: `url(miku_background.jpg)`, backgroundSize: 'cover'}}>
            <div className="loginInnerWrapper">
                <form className="loginForm">
                    <div className="innerFormLoginSuccess">
                        <h2>Congrats! Your account has been successfully created.</h2>
                        <h3>You will be redirected back to the login page shortly. </h3>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AccSuccess;