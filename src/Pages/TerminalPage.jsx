import {TerminalHeader} from "../Components/TerminalHeader/TerminalHeader.jsx";
import {TerminalMain} from "../Components/TerminalMain/TerminalMain.jsx";
import {useEffect, useState} from "react";

export function TerminalPage() {
    const [terminalPageContainer, setTerminalPageContainer] = useState({});

    return (
        <div className="TerminalBody" style={{height: '98vh'}}>
            <TerminalHeader setTerminalPageContainer={setTerminalPageContainer}/>
            <TerminalMain terminalPageContainer={terminalPageContainer}/>
        </div>
    )
}
