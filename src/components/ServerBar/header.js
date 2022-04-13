import './header.css'
import ServerButton from './ServerButton';
function header() {
    return (
        <div>
            <ul className="ulForServers">
                <li className="liForServers">
                    <ServerButton link="#" src="logo192.png" />
                </li>
                <li className="liForServers">
                    <ServerButton link="#" />
                </li>
                <li className="liForServers">
                    <ServerButton link="#" />
                </li>
                <li className="liForServers">
                    <ServerButton link="#" />
                </li>
                <li className="liForServers">
                    <ServerButton link="#" />
                </li>
            </ul>
        </div>
    )
}

export default header;