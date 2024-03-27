import {StrategyReceiver} from "../../ServerReciever/StrategyReceiver.js";

export class StrategyTransmitter {
    static async GetStrategiesNamesAsync() {
        return await StrategyReceiver.GetStrategiesNamesAsync();
    }

    static async GetCandlesStrategyAsync(params) {
        return await StrategyReceiver.GetCandlesStrategyAsync(params);
    }

    static async GetCandlesStrategyFixedPeriodFromAsync(params) {
        return await StrategyReceiver.GetCandlesStrategyFixedPeriodFromAsync(params);
    }
}