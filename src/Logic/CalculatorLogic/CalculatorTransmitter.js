import {CalculatorReceiver} from "../../ServerReciever/CalculatorReceiver.js";
import {dateConverter} from "../StrategyLogic/Utils/CurrentTimeForJson.js";

export class CalculatorTransmitter {
    static async getCalculatorProfit(startDate, endDate, interval, calculatorName, deposit) {
        const params = {
            "from": dateConverter(startDate),
            "to": dateConverter(endDate),
            "figi": "BBG004730N88",
            "interval": interval,
            "strategyName": calculatorName,
            "deposit": deposit
        }

        return CalculatorReceiver.getCalculatedAmount(params);
    }

    static async getCalculatorNames() {
        return CalculatorReceiver.getCalculatorNames();
    }
}