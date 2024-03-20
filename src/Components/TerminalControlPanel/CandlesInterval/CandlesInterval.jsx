import "./CandleInterval.css"
import "../TerminalControlPanel.css"

export function CandlesInterval({ setCandleInterval }) {
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
