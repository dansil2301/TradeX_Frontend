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
import {StrategySocketReceiver} from "../../ServerReciever/StrategySocketReceiver.js";
import {StrategyChartDataGetter} from "./StrategyChartDataGetter.js";

export class StrategyChartsFactory {
    constructor() {
        if (!StrategyChartsFactory.instance) {
            this.strategySocketReceiver = new StrategySocketReceiver();
            this.strategyChartDataGetter = new StrategyChartDataGetter(this.strategySocketReceiver);
            this.chart = null;
            this.candlesToDisplay = 150;
            this.candlesToBeLoadedMax = 450
            this.lastDateInCurrentDataset = null;
            this.firstDateInCurrentDataset = null;
            StrategyChartsFactory.instance = this;
        }

        return StrategyChartsFactory.instance;
    }

    setParams(candleInterval, strategy, graphType) {
        this.strategyChartDataGetter.setParams(candleInterval, strategy, this.candlesToDisplay, graphType);
    }

    candlePushOrChange(dataset, strategies, candle, graphType, label, isNextCandle) {
        if (dataset.label === "Market data") {
            if (isNextCandle)
                dataset.data.push(StrategyChartsDatasets.GraphTypeCandleChange(candle, graphType));
            else
                dataset.data[dataset.data.length - 1] = StrategyChartsDatasets.GraphTypeCandleChange(candle, graphType);
        } else if (dataset.label in strategies) {
            if (isNextCandle)
                dataset.data.push({y: strategies[dataset.label], x: candle.x});
            else
                dataset.data[dataset.data.length - 1] = {y: strategies[dataset.label], x: candle.x};
        }
    }

    socketDatasetsUpdate (message, chart, graphType, candlesToBeLoadedMax, candlePushOrChange) {
        const formattedMarketData = StrategyCandleDivider.CandlesSocketStrategyDivision(message);
        let candle = formattedMarketData.candles;
        let strategies = formattedMarketData.strategies

        chart.data.datasets.forEach(dataset => {
            if (dataset.data[dataset.data.length - 1].x !== candle.x) {
                const isNextCandle = true;
                candlePushOrChange(dataset, strategies, candle, graphType, dataset.label, isNextCandle)
                if (dataset.data.length > candlesToBeLoadedMax)
                { dataset.data.shift(); }
            }
            else {
                const isNextCandle = false;
                candlePushOrChange(dataset, strategies, candle, graphType, dataset.label, isNextCandle)
            }
        });

        if (chart) {
            chart.update();
        }
    }

    async fetchInitialData() {
        await this.strategySocketReceiver.disconnect();
        return await this.strategyChartDataGetter.fetchInitialData();
    }

    async fetchExtraData(candleInterval, strategy, isToFuture) {
        let data;
        const fromDate = isToFuture ? this.firstDateInCurrentDataset : this.lastDateInCurrentDataset;
        await this.strategyChartDataGetter.fetchExtraData(fromDate, isToFuture)
            .then(res => { data = res })
            .catch(async () => {
                // if there are no more candles to fetch connect to socket
                await this.strategyChartDataGetter.socketDataFetch(this.chart, this.candlesToBeLoadedMax, this.socketDatasetsUpdate, this.candlePushOrChange);
            });
        return StrategyCandleDivider.CandlesStrategyDivision(data);
    }

    async socketDataFetch() {
        if (this.chart !== null) {
            await this.strategyChartDataGetter.socketDataFetch(this.chart, this.candlesToBeLoadedMax, this.socketDatasetsUpdate, this.candlePushOrChange);
        }
    }

    getNewZooming(data, candlesToDisplay) {
        return StrategyChartZoomingCalc.GetLimitsOfZooming(data, candlesToDisplay);
    }

    async getNewDataset(receivedDataset, oldDataset, isToFuture) {
        const tmpDataset = receivedDataset;

        if (!isToFuture) {
            tmpDataset.data = tmpDataset.data.concat(oldDataset.data);
            if (receivedDataset.data.length + oldDataset.data.length > this.candlesToBeLoadedMax) {
                tmpDataset.data.splice(this.candlesToBeLoadedMax);
                await this.strategySocketReceiver.disconnect(); // as soon is scrolled from socket visibility disconnect
            }
        }
        else {
            tmpDataset.data = oldDataset.data.concat(tmpDataset.data)
            if (receivedDataset.data.length + oldDataset.data.length > this.candlesToBeLoadedMax) {
                tmpDataset.data.splice(0, tmpDataset.data.length - this.candlesToBeLoadedMax);
            }
        }

        return tmpDataset
    }

    async updateDatasets(chart, data, isToFuture, graphType) {
        const receivedDatasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(data, graphType);
        let newDatasets = [];

        for (const receivedDataset of receivedDatasets) {
            for (const chartDataset of chart.data.datasets) {
                if (receivedDataset.label === chartDataset.label) {
                    const tmpDataset = await this.getNewDataset(receivedDataset, chartDataset, isToFuture);
                    newDatasets.push(tmpDataset);
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
