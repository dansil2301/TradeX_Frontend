export class StrategyCandleDivider {
    static convertCustomCandlesToChartjs(candle) {
        return {
            x: Date.parse(candle.time),
            o: candle.open,
            h: candle.high,
            l: candle.low,
            c: candle.close,
            v: candle.volume
        };
    }

    static CandlesStrategyDivision(strategiesParams) {
        let strategyContainer = {};
        let candles = [];

        for (const strategiesParam of strategiesParams) {
            candles.push(this.convertCustomCandlesToChartjs(strategiesParam.candle));
            let candleDate = candles[candles.length - 1].x;
            for (const strategy of strategiesParam.strategyNameParameters) {
                for (const key in strategy.parameters) {
                    const value = strategy.parameters[key];
                    if (!(key in strategyContainer)) {
                        strategyContainer[key] = [{ x: candleDate, y: value }];
                    }
                    else {
                        strategyContainer[key].push({ x: candleDate, y: value });
                    }
                }
            }
        }

        return {"candles": candles, "strategies": strategyContainer};
    }

    static CandlesSocketStrategyDivision(strategiesParams) {
        let candle = StrategyCandleDivider.convertCustomCandlesToChartjs(strategiesParams.candle);
        let strategies = strategiesParams.strategyNameParameters;
        const strategyContainer = {};
        strategies.forEach(item => {
            const parameters = item.parameters;
            Object.keys(parameters).forEach(parameterName => {
                strategyContainer[parameterName] = parameters[parameterName];
            });
        });

        return {"candles": candle, "strategies": strategyContainer}
    }
}