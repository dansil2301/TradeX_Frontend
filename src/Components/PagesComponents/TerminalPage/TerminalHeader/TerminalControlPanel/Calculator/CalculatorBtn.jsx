import "./CalculatorBtn.css"
import {useState} from "react";
import {CalculatorTransmitter} from "../../../../../../Logic/CalculatorLogic/CalculatorTransmitter.js";
import {CloseBtn} from "../../../../../Common/CloseBtn/CloseBtn.jsx";
import {DateInput} from "./DateInput/DateInput.jsx";
import {DropDownStrategies} from "./DropDownStrategies/DropDownStrategies.jsx";
import {CalculatorDropDownInterval} from "./CalculatorDropDownInterval/CalculatorDropDownInterval.jsx";
import Loading from "../../../../../Common/Loading/Loading.jsx";

export function CalculatorBtn() {
    const [isHovered, setHovered] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calculatorName, setCalculatorName] = useState(null);
    const [interval, setInterval] = useState(null);
    const [deposit, setDeposit] = useState(0);
    const [result, setResult] = useState(null);

    const [isWindowShown, setIsWindowShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleDepositChange = (e) => {
        setDeposit(e.target.value);
    };

    const calculateAmount = () => {
        setIsLoading(true);
        CalculatorTransmitter.getCalculatorProfit(startDate, endDate, interval, calculatorName, deposit)
            .then(response => setResult(response))
            .catch(error => { setResult(error); })
            .finally(() => setIsLoading(false));
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
                            <CloseBtn onClick={toggleWindow} isHovered={isHovered} setHovered={setHovered}/>
                        </div>

                        <h1 className="calculatorHeader">Profit Calculator</h1>

                        <div className="CalculatorInput">
                            <DateInput date={startDate} setDate={setStartDate} />
                        </div>

                        <div className="CalculatorInput">
                            <DateInput date={endDate} setDate={setEndDate} />
                        </div>

                        <DropDownStrategies calculatorName={calculatorName} setCalculatorName={setCalculatorName}/>

                        <CalculatorDropDownInterval interval={interval} setInterval={setInterval}/>

                        <input className="amountInput CalculatorInput" placeholder="Deposit" type="number" step="any"
                               onChange={handleDepositChange}/>

                        <div className="lastStepWrapper">
                            <button className="CalculateAmount" onClick={calculateAmount}>Calculate</button>
                            <div className="calculatorOutput">
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    result !== null ? result : "Amount"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}