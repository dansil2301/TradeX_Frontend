import "./SignIn.css"
import {Link} from "react-router-dom";

export function SignIn() {
    return (
        <Link className="signIn" to="/sign-in">
            Sign in
        </Link>
    );
}