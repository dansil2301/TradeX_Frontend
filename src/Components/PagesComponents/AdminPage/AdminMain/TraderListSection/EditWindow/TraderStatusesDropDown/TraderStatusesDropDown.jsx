import "./TraderStatusesDropDown.css"
import {Fragment, useState} from "react";
import {Arrow} from "../../../../../../Common/Arrow/Arrow.jsx";
import {DropdownOption} from "../../../../../../Common/DropdownOption/DropdownOption.jsx";

const statuses = {
    "TRADER_BASIC": "TRADER_BASIC",
    "TRADER_PLUS": "TRADER_PLUS"
}


export function TraderStatusesDropDown({ status, setStatus }) {
    const [isOpenStatus, setIsOpenStatus] = useState(false);

    const toggleDropdownStatus = () => {
        setIsOpenStatus(!isOpenStatus);
    };

    return (
        <Fragment>
            <button className="DropdownBtn DropdownBtnCalculator editTraderInput"
                    onClick={toggleDropdownStatus}>
            <span className="StrategyElementName">
                {status}
            </span>
                <Arrow/>
            </button>
            {isOpenStatus && (
                <div className="Dropdown DropdownEditTrader">
                    {
                        Object.entries(statuses).map(([name, value]) => (
                            <DropdownOption key={name} value={value} name={name}
                                            setStrategy={setStatus} setIsOpen={setIsOpenStatus}
                                            isOpen={isOpenStatus}/>
                        ))
                    }
                </div>
            )}
        </Fragment>
    )
}