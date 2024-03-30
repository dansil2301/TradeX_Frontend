import { Chart, registerables  } from 'chart.js';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
import ZoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables, OhlcElement, OhlcController, CandlestickElement, CandlestickController, ZoomPlugin);

import {StrategyCandleDivider} from "./DataPreprocessingClassses/StrategyCandleDivider.js";
import {StrategyChartsDatasets} from "./DataPreprocessingClassses/StrategyChartsDatasets.js";
import {StrategyChartZoomingCalc} from "./DataPreprocessingClassses/StrategyChartZoomingCalc.js";
import {strategyChart} from "./StrategyChartConfig.js";
import {StrategyChartsSepGraph} from "./DataPreprocessingClassses/StrategyChartsSepGraph.js";
import {getCurrentTimeInISOFormat, getTimeInISOFormat} from "./Utils/CurrentTimeForJson.js";
import {StrategyTransmitter} from "./StrategyTransmitter.js";
import {TimeGapManager} from "./Utils/TimeGapManager.js";

export class StrategyChartsFactory {
    constructor() {
        if (!StrategyChartsFactory.instance) {
            this.gapManager = new TimeGapManager();
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
                'from': isToFuture ? getTimeInISOFormat(this.firstDateInCurrentDataset) : getTimeInISOFormat(this.lastDateInCurrentDataset),
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
        return StrategyChartZoomingCalc.GetLimitsOfZooming(data, candlesToDisplay);
    }

    updateDatasets(chart, data, isToFuture, graphType) {
        const datasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(data, graphType);
        let newDatasets = [];

        //console.log(this.gapManager.fillGapsWithNull(chart.data.datasets));
        datasets.forEach(newDataset => {
            chart.data.datasets.forEach(chartDataset => {
                if (newDataset.label === chartDataset.label) {
                    const tmpNewDataset = newDataset;
                    if (!isToFuture)
                    { tmpNewDataset.data = tmpNewDataset.data.concat(chartDataset.data); }
                    else
                    { tmpNewDataset.data = chartDataset.data.concat(tmpNewDataset.data) }

                    if (tmpNewDataset.data.length > this.candlesToDisplay * 3) { // more than 3 screens of data are loaded
                        if (!isToFuture)
                        { tmpNewDataset.data.splice(-(newDatasets.length - this.candlesToDisplay * 3)); }
                        else
                        { tmpNewDataset.data.splice(0, newDatasets.length - this.candlesToDisplay * 3); }
                    }

                    newDatasets.push(tmpNewDataset);
                }
            });
        });

        this.lastDateInCurrentDataset = newDatasets[0].data[0].x;
        this.firstDateInCurrentDataset = newDatasets[0].data[newDatasets[0].data.length - 1].x;
        chart.data.datasets = newDatasets;
    }

    createChart(data, ctx, graphType) {
        const formattedMarketData = StrategyCandleDivider.CandlesStrategyDivision(data);
        const limits = StrategyChartZoomingCalc.GetLimitsOfZooming(formattedMarketData.candles, this.candlesToDisplay);
        const datasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(formattedMarketData, graphType);
        const yAxisConfig = StrategyChartsSepGraph.GetYAxisConfig(datasets);

        this.lastDateInCurrentDataset = formattedMarketData.candles.at(0).x;
        this.firstDateInCurrentDataset = formattedMarketData.candles.at(formattedMarketData.candles.length - 1).x;
        return new Chart(ctx, strategyChart(datasets, limits, yAxisConfig,
            (data) => this.getNewZooming(data),
            (chart, data, isToFuture) => this.updateDatasets(chart, data, isToFuture, graphType),
            (isToFuture) => this.fetchExtraData(this.candleInterval, this.strategy, isToFuture)));
    }
}
