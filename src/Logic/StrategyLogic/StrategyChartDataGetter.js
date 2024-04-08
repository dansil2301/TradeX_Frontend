import {getCurrentTimeInISOFormat, getTimeInISOFormat} from "./Utils/CurrentTimeForJson.js";
import {StrategyTransmitter} from "./StrategyTransmitter.js";

export class StrategyChartDataGetter {
    constructor(strategySocketReceiver) {
        this.strategySocketReceiver = strategySocketReceiver;
        this.figi = 'BBG004730N88';
        this.candleInterval;
        this.strategy;
        this.candlesToDisplay;
        this.graphType;
    }

    setParams(candleInterval, strategy, candlesToDisplay, graphType){
        this.candleInterval = candleInterval;
        this.strategy = strategy;
        this.candlesToDisplay = candlesToDisplay;
        this.graphType = graphType;
    }

    async fetchInitialData() {
        const params = {
            'from': getCurrentTimeInISOFormat(),
            'figi': this.figi,
            'interval': this.candleInterval,
            'candleLength': this.candlesToDisplay,
            'strategiesNames': this.strategy
        };

        return await StrategyTransmitter.GetCandlesStrategyFixedPeriodFromAsync(params);
    }

    async fetchExtraData(dateFrom, isToFuture) {
        const params = {
            'from': getTimeInISOFormat(dateFrom),
            'figi': this.figi,
            'interval': this.candleInterval,
            'candleLength': this.candlesToDisplay,
            'strategiesNames': this.strategy,
            'isToFuture': isToFuture
        };

        return await StrategyTransmitter.GetCandlesStrategyFixedPeriodFromAsync(params);
    }

    async socketDataFetch(chart, candlesToBeLoadedMax, callBack, candlePushOrChange) {
        const socketParams = {
            'figi': this.figi,
            'interval': this.candleInterval,
            'strategiesNames': this.strategy === "" ? [] : this.strategy.split(","),
        };

        await this.strategySocketReceiver.connectToLiveData(socketParams, (message) => callBack(message, chart, this.graphType, candlesToBeLoadedMax, candlePushOrChange));
    }
}