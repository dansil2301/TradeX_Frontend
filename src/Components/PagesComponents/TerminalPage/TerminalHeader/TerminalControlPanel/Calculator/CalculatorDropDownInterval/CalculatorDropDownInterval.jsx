import "./CalculatorDropDownInterval.css"
import {Fragment, useState} from "react";
import {Arrow} from "../../../../../../Common/Arrow/Arrow.jsx";
import {DropdownOption} from "../../../../../../Common/DropdownOption/DropdownOption.jsx";

const candleInterval = {
    "Minute": "CANDLE_INTERVAL_1_MIN",
    "5 Minuets": "CANDLE_INTERVAL_5_MIN",
    "10 Minuets": "CANDLE_INTERVAL_10_MIN",
    "Hour": "CANDLE_INTERVAL_HOUR",
    "4 Hours": "CANDLE_INTERVAL_4_HOUR",
    "Day": "CANDLE_INTERVAL_DAY",
    "Week": "CANDLE_INTERVAL_WEEK",
    "Month": "CANDLE_INTERVAL_MONTH"
}

export function CalculatorDropDownInterval({ interval, setInterval }) {
    const [isOpenInterval, setIsOpenInterval] = useState(false);

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }

    const toggleDropdownInterval = () => {
        setIsOpenInterval(!isOpenInterval);
    };

    return (
        <Fragment>
            <button className="DropdownBtn DropdownBtnCalculator CalculatorInput"
                    onClick={toggleDropdownInterval}>
                <span
                    className="StrategyElementName">{interval ? getKeyByValue(candleInterval, interval) : "Candle Interval"}
                </span>
                <Arrow/>
            </button>
            {isOpenInterval && (
                <div className="Dropdown DropdownCalculatorInterval">
                    {
                        Object.entries(candleInterval).map(([name, value]) => (
                            <DropdownOption key={name} value={value} name={name}
                                            setStrategy={setInterval} setIsOpen={setIsOpenInterval}
                                            isOpen={isOpenInterval}/>
                        ))
                    }
                </div>
            )}
        </Fragment>
    )
}