import "./CalculatorBtn.css"
import {useEffect, useState} from "react";
import Loading from "../../../../../Common/Loading/Loading.jsx";
import {DropdownOption} from "../../../../../Common/DropdownOption/DropdownOption.jsx";
import {Arrow} from "../../../../../Common/Arrow/Arrow.jsx";
import {CalculatorTransmitter} from "../../../../../../Logic/CalculatorLogic/CalculatorTransmitter.js";
import {dateConverter} from "../../../../../../Logic/StrategyLogic/Utils/CurrentTimeForJson.js";

const candleInterval = [
    "CANDLE_INTERVAL_1_MIN",
    "CANDLE_INTERVAL_5_MIN",
    "CANDLE_INTERVAL_10_MIN",
    "CANDLE_INTERVAL_HOUR",
    "CANDLE_INTERVAL_4_HOUR",
    "CANDLE_INTERVAL_DAY",
    "CANDLE_INTERVAL_WEEK",
    "CANDLE_INTERVAL_MONTH"
]

export function CalculatorBtn() {
    const [isHovered, setHovered] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calculatorName, setCalculatorName] = useState(null);
    const [interval, setInterval] = useState("CANDLE_INTERVAL_1_MIN");
    const [deposit, setDeposit] = useState(0);
    const [result, setResult] = useState(null);

    const [calculatorNames, setCalculatorNames] = useState(null);
    const [isWindowShown, setIsWindowShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenInterval, setIsOpenInterval] = useState(false);

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

    const toggleWindow = async () => {
        let isPlusTrader = true;
        await CalculatorTransmitter.getCalculatorNames()
            .catch(error => {
                if (error.message.includes("500")) {
                    alert("Update your account status to TRADER PLUS");
                    isPlusTrader = false;
                }
            })
        if (isPlusTrader)
        { setIsWindowShown(!isWindowShown); }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownInterval = () => {
        setIsOpenInterval(!isOpenInterval);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleDepositChange = (e) => {
        setDeposit(e.target.value);
    };

    const calculateAmount = () => {
        const params = {
            "from": dateConverter(startDate),
            "to": dateConverter(endDate),
            "figi": "BBG004730N88",
            "interval": interval,
            "strategyName": calculatorName,
            "deposit": deposit
        }
        console.log(params);
        CalculatorTransmitter.getCalculatorProfit(params)
            .then(response => setResult(response))
            .catch(error => {
                setResult(error);

            });
    }

    return (
        <div className="PanelGeneral">
            <button className="DropdownBtn" onClick={toggleWindow}>
                Calculator
            </button>
            {isWindowShown && (
                <div className="WindowOverlay">
                    <div className="CalculatorWindow">
                        <div className="closeBtnCalculator" id="closeBtnIdCalculator">
                            <svg width="30" height="30" viewBox="0 0 39 39" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 onMouseOver={() => setHovered(true)}
                                 onMouseOut={() => setHovered(false)}
                                 onClick={toggleWindow}>
                                <line style={{transition: "stroke 0.3s ease-in-out"}} y1="-1.5" x2="49.4975" y2="-1.5"
                                      transform="matrix(0.707107 -0.707107 0.717263 0.696803 3.64087 38.139)"
                                      stroke={isHovered ? "#666666" : "#969696"} strokeWidth="3"/>
                                <line style={{transition: "stroke 0.3s ease-in-out"}} y1="-1.5" x2="49.4975" y2="-1.5"
                                      transform="matrix(-0.707107 -0.707107 0.696803 -0.717263 37.6409 35.3002)"
                                      stroke={isHovered ? "#666666" : "#969696"} strokeWidth="3"/>
                            </svg>
                        </div>
                        <h1 className="calculatorHeader">Profit Calculator</h1>

                        <div className="CalculatorInput">
                            <label htmlFor="startDate">Start Date: </label>
                            <input
                                className="CalculatorInputItem"
                                type="datetime-local"
                                id="startDate"
                                value={startDate.toISOString().slice(0, -8)}
                                onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                            />
                        </div>

                        <div className="CalculatorInput">
                            <label htmlFor="endDate">End Date: </label>
                            <input
                                placeholder="End date"
                                className="CalculatorInputItem"
                                type="datetime-local"
                                id="endDate"
                                value={endDate.toISOString().slice(0, -8)}
                                onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                            />
                        </div>

                        <button className="DropdownBtn DropdownBtnCalculator CalculatorInput" onClick={toggleDropdown}>
                            <span
                                className="StrategyElementName">{calculatorName ? calculatorName : "Strategies"}</span>
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

                        <button className="DropdownBtn DropdownBtnCalculator CalculatorInput" onClick={toggleDropdownInterval}>
                            <span
                                className="StrategyElementName">{interval ? interval : "Candle Interval"}</span>
                            <Arrow/>
                        </button>
                        {isOpenInterval && (
                            <div className="Dropdown DropdownCalculatorInterval">
                                {
                                    candleInterval.map(name => (
                                        <DropdownOption key={name} value={name} name={name}
                                                        setStrategy={setInterval} setIsOpen={setIsOpenInterval}
                                                        isOpen={isOpenInterval}/>
                                    ))
                                }
                            </div>
                        )}

                        <input className="amountInput CalculatorInput" placeholder="Deposit" type="number" step="any" onChange={handleDepositChange}/>

                        <div className="lastStepWrapper">
                            <button className="CalculateAmount" onClick={calculateAmount}>Calculate</button>
                            <div className="calculatorOutput">{result ? result : "Amount"}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}