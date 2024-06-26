import {TraderOptionsHeader} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {AccountMain} from "../Components/PagesComponents/AccountPage/AccountMain/AccountMain.jsx";
import {BackgroundImgAccount} from "../Components/PagesComponents/AccountPage/BackgroundImg/BackgroundImgAccount.jsx";
import {useEffect} from "react";
import {StatisticsLogic} from "../Logic/StatisticsLogic/StatisticsLogic.js";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";

export function AccountPage() {
    useEffect(() => {
        async function createPageVisit() {
            await StatisticsLogic.createPageVisit(TraderToken.getTraderIdFromToken(), "Account");
        }

        createPageVisit();
    }, [])

    return (
        <div className="AccountBody" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader />
            <AccountMain />
            <BackgroundImgAccount />
        </div>
    )
}