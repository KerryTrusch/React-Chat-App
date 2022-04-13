import "./FriendsBar.css";
import FriendsSearchBar from "./FriendsSearchBar";
function FriendsBar() {
    return (
        <div className="FriendsWrapper">
            <div className="FriendsFlexContainer">
                <FriendsSearchBar />
            </div>
        </div>
    )
}

export default FriendsBar;