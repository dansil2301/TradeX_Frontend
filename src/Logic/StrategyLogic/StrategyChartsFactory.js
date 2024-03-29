import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
import ZoomPlugin from 'chartjs-plugin-zoom';
import Chart from 'chart.js/auto';
Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController, ZoomPlugin);

import {StrategyCandleDivider} from "./Utils/StrategyCandleDivider.js";
import {StrategyChartsDatasets} from "./StrategyChartsDatasets.js";
import {StrategyChartZoomingCalc} from "./Utils/StrategyChartZoomingCalc.js";
import {strategyChart} from "./StrategyChartConfig.js";
import {StrategyChartsSepGraph} from "./StrategyChartsSepGraph.js";
import {getCurrentTimeInISOFormat, getTimeInISOFormat} from "./Utils/CurrentTimeForJson.js";
import {StrategyTransmitter} from "./StrategyTransmitter.js";

export class StrategyChartsFactory {
    constructor() {
        if (!StrategyChartsFactory.instance) {
            this.candlesToDisplay = 150;
            this.lastDateInCurrentDataset = null;
            this.firstDateInCurrentDataset = null;
            this.candleInterval;
            this.strategy;
            StrategyChartsFactory.instance = this;
        }

        return StrategyChartsFactory.instance;
    }

    async fetchInitialData(candleInterval, strategy) {
        this.candleInterval = candleInterval;
        this.strategy = strategy;

        const params = {
            'from': getCurrentTimeInISOFormat(),
            'figi': 'BBG004730N88',
            'interval': candleInterval,
            'candleLength': this.candlesToDisplay,
            'strategiesNames': strategy
        };

        return await StrategyTransmitter.GetCandlesStrategyFixedPeriodFromAsync(params);
    }

    async fetchExtraData(candleInterval, strategy, isToFuture) {
        if (!this.isFetchingData) {
            const params = {
                'from': getTimeInISOFormat(this.lastDateInCurrentDataset),
                'figi': 'BBG004730N88',
                'interval': candleInterval,
                'candleLength': this.candlesToDisplay,
                'strategiesNames': strategy,
                'isToFuture': isToFuture
            };

            const data = await StrategyTransmitter.GetCandlesStrategyFixedPeriodFromAsync(params);
            return StrategyCandleDivider.CandlesStrategyDivision(data);
        }
    }

    getNewZooming(data, candlesToDisplay) {
        return StrategyChartZoomingCalc.GetLimitsOfZooming(data.candles, candlesToDisplay);
    }

    updateDatasets(chart, data, graphType) {
        this.lastDateInCurrentDataset = data.candles.at(0).x;
        const datasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(data, graphType);
        let newDatasets = [];

        datasets.forEach(newDataset => {
            chart.data.datasets.forEach(chartDataset => {
                if (newDataset.label === chartDataset.label) {
                    const tmpNewDataset = newDataset;
                    tmpNewDataset.data = tmpNewDataset.data.concat(chartDataset.data);
                    newDatasets.push(tmpNewDataset);
                }
            });
        });

        chart.data.datasets = newDatasets;
    }

    createChart(data, ctx, graphType) {
        const formattedMarketData = StrategyCandleDivider.CandlesStrategyDivision(data);
        const limits = StrategyChartZoomingCalc.GetLimitsOfZooming(formattedMarketData.candles, this.candlesToDisplay);
        const datasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(formattedMarketData, graphType);
        const yAxisConfig = StrategyChartsSepGraph.GetYAxisConfig(datasets);

        this.lastDateInCurrentDataset = formattedMarketData.candles.at(0).x;
        return new Chart(ctx, strategyChart(datasets, limits, yAxisConfig,
            (data) => this.getNewZooming(data, this.candlesToDisplay),
            (chart, data) => this.updateDatasets(chart, data, graphType),
            (isToFuture) => this.fetchExtraData(this.candleInterval, this.strategy, isToFuture)));
    }
}
