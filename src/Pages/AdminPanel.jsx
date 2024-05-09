import {
    TraderOptionsHeader
} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";

export function AdminPanel() {
    return (
        <div className="AccountBody" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader />
        </div>
    )
}