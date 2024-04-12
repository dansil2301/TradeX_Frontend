import "./OptionBlock.css"
import YES from "../../../../assets/TraderOptions/FeaturesYesNo/YES.png"
import NO from "../../../../assets/TraderOptions/FeaturesYesNo/NO.png"
import {GetStartedBtn} from "../../../Common/GetStartedBtn/GetStartedBtn.jsx";

const features = [
    "Indicators",
    "Calculator"
]

export function OptionBlock({name, price, featuresAvalaible}) {

    return (
        <div className="OptionBlock">
            <div className="OptionHeader">
                BASIC
            </div>
            <div className="OptionPrice">
                € 0.00 <span className="OptionMonthText">/ month</span>
            </div>
            <GetStartedBtn />
            <div className="OptionFeatures">
                {features.map((feature, index) => (
                    <div className="OptionFeature" key={index}>
                        <img className="OptionIncludeIndicator" src={YES} alt={"YES"}/>
                        {feature}
                    </div>
                ))}
            </div>
        </div>
    )
}