import "./IndexHeader.css"
import {Menu} from "../../Common/Menu/Menu.jsx";
import {Eye} from "../../Common/Eye/Eye.jsx";
import {SignIn} from "./SignIn/SignIn.jsx";

export function IndexHeader() {
    return (
        <div className="indexHeader">
            <Menu/>
            <SignIn />
            <Eye/>
        </div>
    );
}