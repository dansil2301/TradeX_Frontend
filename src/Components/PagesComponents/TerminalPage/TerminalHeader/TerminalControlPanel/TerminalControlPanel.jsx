import "./TerminalControlPanel.css"
import ConnectedCandlesInterval from "./CandlesInterval/CandlesInterval.jsx";
import ConnectedGraphType from "./GraphType/GraphType.jsx";
import ConnectedStrategiesElement from "./StrategiesElement/StrategiesElement.jsx";
import {CalculatorBtn} from "./Calculator/CalculatorBtn.jsx";

export function TerminalControlPanel() {
    return (
        <div className="ControlPanel">
            <ConnectedCandlesInterval />
            <ConnectedGraphType />
            <ConnectedStrategiesElement />
            <CalculatorBtn />
        </div>
    )
}
