import {StrategyReceiver} from "../../ServerReciever/StrategyReceiver.js";

export class StrategyTransmitter {
    static async GetStrategiesNamesAsync() {
        return await StrategyReceiver.GetStrategiesNamesAsync();
    }

    static async GetCandlesStrategyAsync(params) {
        return await StrategyReceiver.GetCandlesStrategyAsync(params);
    }
}