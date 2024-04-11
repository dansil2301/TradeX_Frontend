import "./TerminalHeader.css"
import {Eye} from "../../Common/Eye/Eye.jsx";
import {MenuBtn} from "../../Common/Menu/MenuBtn/MenuBtn.jsx";
import {TerminalControlPanel} from "./TerminalControlPanel/TerminalControlPanel.jsx";
import {Menu} from "../../Common/Menu/Menu.jsx";

export function TerminalHeader() {
    return (
        <div className="terminalHeader">
            <Menu />
            <TerminalControlPanel />
            <Eye />
        </div>
    )
}
