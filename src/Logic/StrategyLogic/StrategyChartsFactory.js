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

export class StrategyChartsFactory {
    static candlesToDisplay = 150;

    static FetchExtraData() {

    }

    static CreateChart(data, ctx, graphType) {
        const formattedMarketData = StrategyCandleDivider.CandlesStrategyDivision(data);
        const limits = StrategyChartZoomingCalc.GetLimitsOfZooming(formattedMarketData.candles, this.candlesToDisplay);
        const datasets = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(formattedMarketData, graphType);
        const yAxisConfig = StrategyChartsSepGraph.GetYAxisConfig(datasets);

        return new Chart(ctx, strategyChart(datasets, limits, yAxisConfig));
    }
}
