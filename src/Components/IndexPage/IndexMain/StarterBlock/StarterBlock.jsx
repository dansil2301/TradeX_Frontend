import "./StarterBlock.css"
import {IntroductionText} from "./IntroductionText/IntroductionText.jsx";
import {GetStartedBtn} from "./GetStartedBtn/GetStartedBtn.jsx";

export function StarterBlock() {
    return (
        <div className="StarterBlock">
            <IntroductionText />
            <GetStartedBtn />
        </div>
    )
}