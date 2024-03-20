import "./TerminalControlPanel.css"
import {CandlesInterval} from "./CandlesInterval/CandlesInterval.jsx";
import {GraphType} from "./GraphType/GraphType.jsx";
import {StrategiesElement} from "./StrategiesElement/StrategiesElement.jsx";
import PropTypes from "prop-types";
import {TerminalHeader} from "../TerminalHeader/TerminalHeader.jsx";
import {useEffect, useState} from "react";

export function TerminalControlPanel({ setTerminalPageContainer }) {
    const [candleInterval, setCandleInterval] = useState(NaN);
    const [graphType, setGraphType] = useState(NaN);
    const [strategy, setStrategy] = useState(NaN);

    useEffect(() => {
        setTerminalPageContainer({ candleInterval, graphType, strategy });
    }, [candleInterval, graphType, strategy, setTerminalPageContainer]);

    return (
        <div className="ControlPanel">
            <CandlesInterval setCandleInterval={setCandleInterval}/>
            <GraphType setGraphType={setGraphType}/>
            <StrategiesElement setStrategy={setStrategy}/>
        </div>
    )
}

TerminalControlPanel.propTypes = {
    setTerminalPageContainer: PropTypes.func.isRequired
};

