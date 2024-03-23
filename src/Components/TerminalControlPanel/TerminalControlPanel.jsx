import "./TerminalControlPanel.css"
import {CandlesInterval} from "./CandlesInterval/CandlesInterval.jsx";
import {GraphType} from "./GraphType/GraphType.jsx";
import {StrategiesElement} from "./StrategiesElement/StrategiesElement.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

export function TerminalControlPanel({ setTerminalPageContainer }) {
    const [candleInterval, setCandleInterval] = useState('CANDLE_INTERVAL_1_MIN');
    const [graphType, setGraphType] = useState('candle');
    const [strategy, setStrategy] = useState('');

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

