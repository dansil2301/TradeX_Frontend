import "./TerminalHeader.css"
import {Eye} from "../Eye/Eye.jsx";
import {MenuBtn} from "../MenuBtn/MenuBtn.jsx";

export function TerminalHeader() {
    return (
        <div className="terminalHeader">
            <MenuBtn />
            <Eye />
        </div>
    )
}