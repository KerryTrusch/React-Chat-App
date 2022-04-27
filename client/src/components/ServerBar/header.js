import './header.css';
import './ServerButton.css';
import ServerButton from './ServerButton';
import CreateServer from './CreateServerModal';
import React, { useState } from 'react';
function Header() {
    const [showmod, setShowmod] = useState();

    const showModal = () => {
        setShowmod(true);
    }

    const hideModal = () => {
        setShowmod(false);
    }
    return (
        <div>
            <ul className="ulForServers">
                <li className="liForServers">
                    <CreateServer show={showmod} handleClose={hideModal} />
                    <button type="button" onClick={showModal}>
                        <img className="serverButton" alt='' src='create-plus.png' />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Header;