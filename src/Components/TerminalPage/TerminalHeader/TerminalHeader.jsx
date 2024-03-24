import "./TerminalHeader.css"
import {Eye} from "../../Common/Eye/Eye.jsx";
import {MenuBtn} from "../../Common/MenuBtn/MenuBtn.jsx";
import {TerminalControlPanel} from "./TerminalControlPanel/TerminalControlPanel.jsx";

export function TerminalHeader() {
    return (
        <div className="terminalHeader">
            <MenuBtn />
            <TerminalControlPanel />
            <Eye />
        </div>
    )
}
