import "./CandleInterval.css"
import "../TerminalControlPanel.css"
import { setCandleInterval } from '../../../ConfigRedux/Terminal/Actions.js';
import PropTypes from "prop-types";
import {connect} from "react-redux";

const CandlesInterval = ({ setCandleInterval }) => {
    const handleIntervalChange = (newInterval) => {
        setCandleInterval(newInterval);
    };

    return (
        <div className="PanelGeneral CandleInterval">
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_1_MIN')}>
                <span>1M</span>
            </button>
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_5_MIN')}>
                <span>5M</span>
            </button>
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_10_MIN')}>
                <span>10M</span>
            </button>
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_HOUR')}>
                <span>1H</span>
            </button>
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_4_HOUR')}>
                <span>4H</span>
            </button>
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_DAY')}>
                <span>D</span>
            </button>
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_WEEK')}>
                <span>W</span>
            </button>
            <button className="CandleItem" onClick={() => handleIntervalChange('CANDLE_INTERVAL_MONTH')}>
                <span>Mon</span>
            </button>
        </div>
    );
}

CandlesInterval.propTypes = {
    setCandleInterval: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    setCandleInterval: setCandleInterval
};

const ConnectedCandlesInterval = connect(null, mapDispatchToProps)(CandlesInterval);
export default ConnectedCandlesInterval;
