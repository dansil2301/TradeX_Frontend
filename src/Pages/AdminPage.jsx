import {
    TraderOptionsHeader
} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {AdminMain} from "../Components/PagesComponents/AdminPage/AdminMain/AdminMain.jsx";
import {useEffect} from "react";
import {StatisticsLogic} from "../Logic/StatisticsLogic/StatisticsLogic.js";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";

export function AdminPage() {
    useEffect(() => {
        async function createPageVisit() {
            await StatisticsLogic.createPageVisit(TraderToken.getTraderIdFromToken(), "Admin");
        }

        createPageVisit();
    }, [])

    return (
        <div className="AccountBody" style={{height: 'calc(100vh - 35px)'}}>
            <TraderOptionsHeader />
            <AdminMain />
        </div>
    )
}