import {TraderOptionsHeader} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {AccountMain} from "../Components/PagesComponents/AccountPage/AccountMain/AccountMain.jsx";
import {BackgroundImgAccount} from "../Components/PagesComponents/AccountPage/BackgroundImg/BackgroundImgAccount.jsx";

export function AccountPage() {
    return (
        <div className="AccountBody" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader />
            <AccountMain />
            <BackgroundImgAccount />
        </div>
    )
}