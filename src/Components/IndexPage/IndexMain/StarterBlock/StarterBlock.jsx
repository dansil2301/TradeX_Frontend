import "./StarterBlock.css"
import {IntroductionText} from "./IntroductionText/IntroductionText.jsx";
import {GetStartedBtn} from "../../../Common/GetStartedBtn/GetStartedBtn.jsx";

export function StarterBlock() {
    return (
        <div className="StarterBlock">
            <IntroductionText />
            <GetStartedBtn />
        </div>
    )
}