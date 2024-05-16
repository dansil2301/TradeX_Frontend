import {TraderOptionsHeader} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {SignUpMain} from "../Components/PagesComponents/SignUpPage/SignUpMain/SignUpMain.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";
import {BackgroundImgSignUp} from "../Components/PagesComponents/SignUpPage/BackgroundImg/BackgroundImgSignUp.jsx";

export function SignUpPage() {
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
        <div className="SignUpPage" style={{height: 'calc(100vh - 20px)'}}>
            <TraderOptionsHeader/>
            <SignUpMain />
            <BackgroundImgSignUp />
        </div>
    );
}