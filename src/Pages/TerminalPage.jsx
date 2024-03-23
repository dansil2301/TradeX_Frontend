import {TerminalHeader} from "../Components/TerminalHeader/TerminalHeader.jsx";
import {TerminalMain} from "../Components/TerminalMain/TerminalMain.jsx";
import {useState} from "react";

export function TerminalPage() {
    const [terminalPageContainer, setTerminalPageContainer] = useState(
        {
            candleInterval: 'CANDLE_INTERVAL_1_MIN',
            graphType: 'candle',
            strategy: NaN
        });

    return (
        <div className="TerminalBody" style={{height: '98vh'}}>
            <TerminalHeader setTerminalPageContainer={setTerminalPageContainer}/>
            <TerminalMain terminalPageContainer={terminalPageContainer}/>
        </div>
    )
}
