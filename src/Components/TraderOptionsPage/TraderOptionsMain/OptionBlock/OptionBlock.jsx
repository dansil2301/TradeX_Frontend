import "./OptionBlock.css"
import YES from "../../../../assets/TraderOptions/FeaturesYesNo/YES.png"
import NO from "../../../../assets/TraderOptions/FeaturesYesNo/NO.png"
import {GetStartedBtn} from "../../../Common/GetStartedBtn/GetStartedBtn.jsx";

export function OptionBlock({name, price, featuresAvalaible}) {
    return (
        <div className="OptionBlock">
            <div className="OptionHeader">
                { name }
            </div>
            <div className="OptionPrice">
                € {price} <span className="OptionMonthText">/ month</span>
            </div>
            <GetStartedBtn to="/sign-up"/>
            <div className="OptionFeatures">
                {featuresAvalaible.map((feature, index) => (
                    <div className="OptionFeature" key={index}>
                        <img src={feature.hasFeature ? YES : NO} alt={feature.hasFeature ? "YES" : "NO"}
                        className="OptionIncludeIndicator"/>
                        {feature.name}
                    </div>
                ))}
            </div>
        </div>
    )
}