import {CalculatorReceiver} from "../../ServerReciever/CalculatorReceiver.js";

export class CalculatorTransmitter {
    static async getCalculatorProfit(params) {
        return CalculatorReceiver.getCalculatedAmount(params);
    }

    static async getCalculatorNames() {
        return CalculatorReceiver.getCalculatorNames();
    }
}