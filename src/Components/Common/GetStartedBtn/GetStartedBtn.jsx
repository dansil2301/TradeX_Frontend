import "./GetStartedBtn.css"
import {Link} from "react-router-dom";

export function GetStartedBtn({ to }) {
    return (
        <Link to={to} className="getStartedBtn">
            <span className="getStartedBtnText">
                Get started
            </span>
        </Link>
    )
}