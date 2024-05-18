import {
    TraderOptionsHeader
} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {AdminMain} from "../Components/PagesComponents/AdminPage/AdminMain/AdminMain.jsx";

export function AdminPanel() {
    return (
        <div className="AccountBody" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader />
            <AdminMain />
        </div>
    )
}