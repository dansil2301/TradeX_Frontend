import {TraderOptionsHeader} from "../Components/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {SignUpMain} from "../Components/SignUpPage/SignUpMain/SignUpMain.jsx";

export function SignUpPage() {
    return (
        <div className="SignUpPage" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader/>
            <SignUpMain />
        </div>
    );
}