import './header.css'
import ServerButton from './ServerButton';
function header() {
    return (
        <ul className="ulForServers">
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
    )
}

export default header;