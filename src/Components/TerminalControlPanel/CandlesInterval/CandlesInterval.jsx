import "./CandleInterval.css"
import "../TerminalControlPanel.css"

export function CandlesInterval() {
    return (
        <div className="PanelGeneral CandleInterval">
            <button className="CandleItem">
                <span>1M</span>
            </button>
            <button className="CandleItem">
                <span>5M</span>
            </button>
            <button className="CandleItem">
                <span>10M</span>
            </button>
            <button className="CandleItem">
                <span>1H</span>
            </button>
            <button className="CandleItem">
                <span>4H</span>
            </button>
            <button className="CandleItem">
                <span>D</span>
            </button>
            <button className="CandleItem">
                <span>W</span>
            </button>
            <button className="CandleItem">
                <span>Mon</span>
            </button>
        </div>
    )
}