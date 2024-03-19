import "./CandleInterval.css"
import "../TerminalControlPanel.css"

export function CandlesInterval() {
    return (
        <div className="PanelGeneral CandleInterval">
            <a className="CandleItem">
                <span>1M</span>
            </a>
            <a className="CandleItem">
                <span>5M</span>
            </a>
            <a className="CandleItem">
                <span>10M</span>
            </a>
            <a className="CandleItem">
                <span>1H</span>
            </a>
            <a className="CandleItem">
                <span>4H</span>
            </a>
            <a className="CandleItem">
                <span>D</span>
            </a>
            <a className="CandleItem">
                <span>W</span>
            </a>
            <a className="CandleItem">
                <span>Mon</span>
            </a>
        </div>
    )
}