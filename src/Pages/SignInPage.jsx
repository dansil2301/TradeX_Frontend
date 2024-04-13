import {TraderOptionsHeader} from "../Components/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {SignInMain} from "../Components/SignInPage/SignInMain/SignInMain.jsx";

export function SignInPage() {
    return (
        <div className="SignInPage" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader/>
            <SignInMain />
        </div>
    );
}