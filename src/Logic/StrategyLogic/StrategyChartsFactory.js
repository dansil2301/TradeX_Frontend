import 'chartjs-adapter-date-fns';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
import {CrosshairPlugin} from 'chartjs-plugin-crosshair';
import ZoomPlugin from 'chartjs-plugin-zoom';
import Chart from 'chart.js/auto';
Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController, CrosshairPlugin, ZoomPlugin);

import {StrategyCandleDivider} from "./StrategyCandleDivider.js";
import {StrategyChartsDatasets} from "./StrategyChartsDatasets.js";
import {plugins, scales} from "./StrategyChartsConfig.js";

export class StrategyChartsFactory {
    static candlesToDisplay = 200;

    static CreateChart(data, ctx, graphType) {
        const formatedMarketData = StrategyCandleDivider.CandlesStrategyDivision(data);
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
                plugins: plugins(),
                scales: scales(yAxisConfig),
            }
        });
    }
}