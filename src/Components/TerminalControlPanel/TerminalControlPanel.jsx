import "./TerminalControlPanel.css"
import {CandlesInterval} from "./CandlesInterval/CandlesInterval.jsx";
import {GraphType} from "./GraphType/GraphType.jsx";
import {StrategiesElement} from "./StrategiesElement/StrategiesElement.jsx";

export function TerminalControlPanel() {
    return (
        <div className="ControlPanel">
            <CandlesInterval />
            <GraphType />
            <StrategiesElement />
        </div>
    )
}