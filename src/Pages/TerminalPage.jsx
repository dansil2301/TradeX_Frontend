import {TerminalHeader} from "../Components/TerminalHeader/TerminalHeader.jsx";
import {TerminalMain} from "../Components/TerminalMain/TerminalMain.jsx";

export function TerminalPage() {
    return (
        <div className="TerminalBody" style={{height: '98vh'}}>
            <TerminalHeader />
            <TerminalMain />
        </div>
    )
}