import {StatisticsChart} from "./Charts/StatisticsChart.jsx";

export function StatisticsMain({ pageName, fromDate, toDate }) {
    return (
        <div className="TerminalContainer">
            <div className="TerminalMain">
                <StatisticsChart pageName={pageName} fromDate={fromDate} toDate={toDate}/>
            </div>
        </div>
    )
}