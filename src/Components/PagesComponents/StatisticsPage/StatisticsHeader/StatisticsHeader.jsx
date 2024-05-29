import "./StatisticsHeader.css"
import {Menu} from "../../../Common/Menu/Menu.jsx";
import {Eye} from "../../../Common/Eye/Eye.jsx";
import {StatisticsControlPanel} from "./StatisticsControlPanel/StatisticsControlPanel.jsx";
import {useState} from "react";

export function StatisticsHeader({ setPageName, setFromDate, setToDate }) {

    return (
        <div className="terminalHeader">
            <Menu />
            <StatisticsControlPanel setPageName={setPageName} setFromDate={setFromDate} setToDate={setToDate}/>
            <Eye />
        </div>
    )
}