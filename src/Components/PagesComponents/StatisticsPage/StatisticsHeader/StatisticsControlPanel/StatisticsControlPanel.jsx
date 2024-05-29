import "./StatisticsControlPanel.css"
import {PageDropDown} from "./PageDropDown/PageDropDown.jsx";
import {DateElement} from "./PageDropDown/DateElement/DateElement.jsx";

export function StatisticsControlPanel({ setPageName, setFromDate, setToDate }) {

    return (
        <div className="ControlPanel">
            <PageDropDown setPageName={setPageName}/>
            <DateElement setDateElement={setFromDate} palceholder="From:"/>
            <DateElement setDateElement={setToDate} palceholder="To:"/>
        </div>
    )
}