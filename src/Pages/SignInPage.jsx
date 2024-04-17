import {TraderOptionsHeader} from "../Components/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {SignInMain} from "../Components/PagesComponents/SignInPage/SignInMain/SignInMain.jsx";
import {useNavigate} from "react-router-dom";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";
import {useEffect} from "react";

export function SignInPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const isValidToken = await TraderToken.checkIfTokenIsValid();
            if (isValidToken) {
                navigate("/terminal")
            }
        };

        checkTokenValidity();
    }, [navigate]);

    return (
        <div className="SignInPage" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader/>
            <SignInMain />
        </div>
    );
}