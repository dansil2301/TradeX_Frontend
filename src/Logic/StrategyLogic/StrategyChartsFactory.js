import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
import ZoomPlugin from 'chartjs-plugin-zoom';
import Chart from 'chart.js/auto';
Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController, ZoomPlugin);

import {StrategyCandleDivider} from "./Utils/StrategyCandleDivider.js";
import {StrategyChartsDatasets} from "./StrategyChartsDatasets.js";
import {plugins, scales} from "./StrategyChartsConfig.js";
import {StrategyChartZoomingCalc} from "./Utils/StrategyChartZoomingCalc.js";

export class StrategyChartsFactory {
    static candlesToDisplay = 200;

    static CreateChart(data, ctx, graphType) {
        const formatedMarketData = StrategyCandleDivider.CandlesStrategyDivision(data);
        const limits = StrategyChartZoomingCalc.GetLimitsOfZooming(formatedMarketData.candles, this.candlesToDisplay);
        const {datasets, yAxisConfig} = StrategyChartsDatasets.CreateDifferentDatasetsAndPositions(formatedMarketData, this.candlesToDisplay, graphType);

        return new Chart(ctx, {
            type: "candlestick",
            data: {
                datasets: datasets
            },
            options: {
                responsive: true,
                animation: false,
                maintainAspectRatio: false,
                plugins: plugins(limits),
                scales: scales(yAxisConfig),
            }
        });
    }
}