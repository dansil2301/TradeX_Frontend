import "./OptionsMain.css"
import {OptionBlock} from "./OptionBlock/OptionBlock.jsx";

const BASIC_features = [
    { name: "Indicators", hasFeature: true },
    { name: "Calculator", hasFeature: false }
]

const PLUS_features = [
    { name: "Indicators", hasFeature: true },
    { name: "Calculator", hasFeature: true }
]

export function OptionsMain() {
    return (
        <div className="OptionsMain">
            <OptionBlock name="BASIC" price="0.00" featuresAvalaible={BASIC_features}/>
            <OptionBlock name="PLUS" price="5.00" featuresAvalaible={PLUS_features}/>
        </div>
    )
}