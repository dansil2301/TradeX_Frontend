import { Chart, registerables  } from 'chart.js';
import 'chartjs-adapter-luxon';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
import ZoomPlugin from 'chartjs-plugin-zoom';
import ChartStreaming from 'chartjs-plugin-streaming';
Chart.register(...registerables, OhlcElement, OhlcController, CandlestickElement, CandlestickController, ZoomPlugin, ChartStreaming);

import {StrategyCandleDivider} from "./DataPreprocessingClassses/StrategyCandleDivider.js";
import {StrategyChartsDatasets} from "./DataPreprocessingClassses/StrategyChartsDatasets.js";
import {StrategyChartZoomingCalc} from "./DataPreprocessingClassses/StrategyChartZoomingCalc.js";
import {strategyChart} from "./StrategyChartConfig.js";
import {StrategyChartsSepGraph} from "./DataPreprocessingClassses/StrategyChartsSepGraph.js";
import {getCurrentTimeInISOFormat, getTimeInISOFormat} from "./Utils/CurrentTimeForJson.js";
import {StrategyTransmitter} from "./StrategyTransmitter.js";
import {StrategySocketReceiver} from "../../ServerReciever/StrategySocketReceiver.js";

export class StrategyChartsFactory {
    constructor() {
        if (!StrategyChartsFactory.instance) {
            this.chart = null;
            this.strategySocketReceiver = new StrategySocketReceiver();
            this.candlesToDisplay = 150;
            this.lastDateInCurrentDataset = null;
            this.firstDateInCurrentDataset = null;
            this.candleInterval;
            this.strategy;
            StrategyChartsFactory.instance = this;
        }

        return StrategyChartsFactory.instance;
    }

    callBack (message, chart, graphType) {
        let candle = StrategyCandleDivider.convertCustomCandlesToChartjs(message.candle);
        let strategies = message.strategyNameParameters;
        const parameterObject = {};
        strategies.forEach(item => {
            const parameters = item.parameters;
            Object.keys(parameters).forEach(parameterName => {
                parameterObject[parameterName] = parameters[parameterName];
            });
        });

        this.chart.data.datasets.forEach(dataset => {
            if (dataset.label === "Market data") {
                if (dataset.data[dataset.data.length - 1].x !== candle.x){
                    dataset.data.push(graphType === "candle" ? candle : {x: candle.x, y: candle.c});
                    if (dataset.data.length > this.candlesToDisplay * 3) {
                        dataset.data.shift();
                    }
                }
                else {
                    dataset.data[dataset.data.length - 1] = graphType === "candle" ? candle : {x: candle.x, y: candle.c};
                }
            }
            else if (dataset.label in parameterObject) {
                if (dataset.data[dataset.data.length - 1].x !== candle.x){
                    dataset.data.push({y: parameterObject[dataset.label], x: candle.x});
                    if (dataset.data.length > this.candlesToDisplay * 3) {
                        dataset.data.shift();
                    }
                }
                else {
                    dataset.data[dataset.data.length - 1] = {y: parameterObject[dataset.label], x: candle.x};
                }
            }
        });

        if (chart) {
            chart.update();
        }
    }

    async fetchInitialData(candleInterval, strategy) {
        await this.strategySocketReceiver.disconnect();
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
                'from': isToFuture ? getTimeInISOFormat(this.firstDateInCurrentDataset) : getTimeInISOFormat(this.lastDateInCurrentDataset),
                'figi': 'BBG004730N88',
                'interval': candleInterval,
                'candleLength': this.candlesToDisplay,
                'strategiesNames': strategy,
                'isToFuture': isToFuture
            };
            const socketParams = {
                'figi': 'BBG004730N88',
                'interval': this.candleInterval,
                'strategiesNames': this.strategy === "" ? [] : this.strategy.split(","),
            };

            let data;
            await StrategyTransmitter.GetCandlesStrategyFixedPeriodFromAsync(params)
                .then(res => { data = res })
                .catch(async () => {
                    await this.strategySocketReceiver.connectToLiveData(socketParams, (message) => this.callBack(message, this.chart));
                });
            return StrategyCandleDivider.CandlesStrategyDivision(data);
        }
    }

    async socketDataFetch(graphType) {
        const socketParams = {
            'figi': 'BBG004730N88',
            'interval': this.candleInterval,
            'strategiesNames': this.strategy === "" ? [] : this.strategy.split(","),
        };

        if (this.chart !== null) {
            await this.strategySocketReceiver.connectToLiveData(socketParams, (message) => this.callBack(message, this.chart, graphType));
        }
    }

    getNewZooming(data, candlesToDisplay) {
        return StrategyChartZoomingCalc.GetLimitsOfZooming(data, candlesToDisplay);
    }

    async updateDatasets(chart, data, isToFuture, graphType) {
        const datasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(data, graphType);
        let newDatasets = [];

        for (const newDataset of datasets) {
            for (const chartDataset of chart.data.datasets) {
                if (newDataset.label === chartDataset.label) {
                    const tmpNewDataset = newDataset;
                    if (!isToFuture)
                    { tmpNewDataset.data = tmpNewDataset.data.concat(chartDataset.data); }
                    else
                    { tmpNewDataset.data = chartDataset.data.concat(tmpNewDataset.data) }

                    if (tmpNewDataset.data.length > this.candlesToDisplay * 3) { // more than 3 screens of data are loaded
                        if (!isToFuture) {
                            tmpNewDataset.data.splice(-(newDatasets.length - this.candlesToDisplay * 3));
                            await this.strategySocketReceiver.disconnect();
                        }
                        else
                        { tmpNewDataset.data.splice(0, newDatasets.length - this.candlesToDisplay * 3); }
                    }

                    newDatasets.push(tmpNewDataset);
                }
            }
        }

        this.lastDateInCurrentDataset = newDatasets[0].data[0].x;
        this.firstDateInCurrentDataset = newDatasets[0].data[newDatasets[0].data.length - 1].x;
        chart.data.datasets = newDatasets;
    }

    async createChart(data, ctx, graphType) {
        const formattedMarketData = StrategyCandleDivider.CandlesStrategyDivision(data);
        const limits = StrategyChartZoomingCalc.GetLimitsOfZooming(formattedMarketData.candles, this.candlesToDisplay);
        const datasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(formattedMarketData, graphType);
        const yAxisConfig = StrategyChartsSepGraph.GetYAxisConfig(datasets);

        this.lastDateInCurrentDataset = formattedMarketData.candles.at(0).x;
        this.firstDateInCurrentDataset = formattedMarketData.candles.at(formattedMarketData.candles.length - 1).x;
        this.chart = new Chart(ctx, strategyChart(datasets, limits, yAxisConfig,
            (data) => this.getNewZooming(data),
            (chart, data, isToFuture) => this.updateDatasets(chart, data, isToFuture, graphType),
            (isToFuture) => this.fetchExtraData(this.candleInterval, this.strategy, isToFuture)));
        await this.socketDataFetch(graphType);

        return this.chart;
    }
}
