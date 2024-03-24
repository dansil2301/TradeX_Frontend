import "./TerminalHeader.css"
import {Eye} from "../Eye/Eye.jsx";
import {MenuBtn} from "../MenuBtn/MenuBtn.jsx";
import {TerminalControlPanel} from "../TerminalControlPanel/TerminalControlPanel.jsx";

export function TerminalHeader() {
    return (
        <div className="terminalHeader">
            <MenuBtn />
            <TerminalControlPanel />
            <Eye />
        </div>
    )
}
