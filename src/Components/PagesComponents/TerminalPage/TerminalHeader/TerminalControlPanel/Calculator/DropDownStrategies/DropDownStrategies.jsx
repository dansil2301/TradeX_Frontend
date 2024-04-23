import "./DropDownStrategies.css"
import {Fragment, useEffect, useState} from "react";
import {CalculatorTransmitter} from "../../../../../../../Logic/CalculatorLogic/CalculatorTransmitter.js";
import {Arrow} from "../../../../../../Common/Arrow/Arrow.jsx";
import Loading from "../../../../../../Common/Loading/Loading.jsx";
import {DropdownOption} from "../../../../../../Common/DropdownOption/DropdownOption.jsx";

export function DropDownStrategies({ calculatorName, setCalculatorName }) {
    const [calculatorNames, setCalculatorNames] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setError(null);
        setLoading(true);
        const fetchCalculatorNames = async () => {
            await CalculatorTransmitter.getCalculatorNames()
                .then(res => {setCalculatorNames(res);})
                .catch(error => {setError(error);})
                .finally(() => setLoading(false));
        };

        fetchCalculatorNames();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Fragment>
            <button className="DropdownBtn DropdownBtnCalculator CalculatorInput" onClick={toggleDropdown}>
                <span
                    className="StrategyElementName">{calculatorName ? calculatorName : "Strategies"}
                </span>
                <Arrow/>
            </button>
            {isOpen && (
                <div className="Dropdown DropdownCalculator">
                    {loading ? (
                        <Loading/>
                    ) : error ? (
                        <div className="Error">Error: {error.message}</div>
                    ) : (
                        calculatorNames.map(name => (
                            <DropdownOption key={name} value={name} name={name}
                                            setStrategy={setCalculatorName} setIsOpen={setIsOpen}
                                            isOpen={isOpen}/>
                        ))
                    )
                    }
                </div>
            )}
        </Fragment>
    )
}