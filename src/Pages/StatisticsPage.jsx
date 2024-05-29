import {StatisticsHeader} from "../Components/PagesComponents/StatisticsPage/StatisticsHeader/StatisticsHeader.jsx";
import {useState} from "react";
import {StatisticsMain} from "../Components/PagesComponents/StatisticsPage/StatisticsMain/StatisticsMain.jsx";

export function StatisticsPage() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const [pageName, setPageName] = useState("All");
    const [fromDate, setFromDate] = useState(formatDate(weekAgo));
    const [toDate, setToDate] = useState(formatDate(now));

    return (
        <div className="AccountBody" style={{height: 'calc(100vh - 35px)'}}>
            <StatisticsHeader setPageName={setPageName} setFromDate={setFromDate} setToDate={setToDate}/>
            <StatisticsMain pageName={pageName} fromDate={fromDate} toDate={toDate}/>
        </div>
    )
}