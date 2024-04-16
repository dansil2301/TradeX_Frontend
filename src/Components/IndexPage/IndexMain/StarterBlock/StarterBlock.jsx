import "./StarterBlock.css"
import {IntroductionText} from "./IntroductionText/IntroductionText.jsx";
import {GetStartedBtn} from "../../../Common/GetStartedBtn/GetStartedBtn.jsx";
import {useEffect, useState} from "react";
import {TraderToken} from "../../../../Logic/TraderLogic/TraderToken.js";

export function StarterBlock() {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const isValidToken = await TraderToken.checkIfTokenIsValid();
                setIsValid(isValidToken);
            } catch (error) {
                setIsValid(false);
            }
        };

        checkTokenValidity();
    }, []);

    return (
        <div className="StarterBlock">
            <IntroductionText />
            <GetStartedBtn to={!isValid ? "/trader-options" : "/terminal"}/>
        </div>
    )
}