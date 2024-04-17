import "./SignOutBtn.css"
import {TraderToken} from "../../../../../Logic/TraderLogic/TraderToken.js";

export function SignOutBtn() {
    const handleSignOut = () => {
        TraderToken.clearToken();
        //window.location.reload();
    };

    return (
        <button className="SignOut" onClick={handleSignOut}>
            Sign out
        </button>
    );
}
