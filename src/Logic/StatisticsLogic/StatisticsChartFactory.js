import {Chart} from "chart.js";
import {statisticsChartConfig} from "./StatisticsChartConfig.js";
import {StatisticsDatasetManager} from "./StatisticsDatasetManager.js";

export class StatisticsChartFactory {
    statisticsDatasetManager = new StatisticsDatasetManager();

    async createChart(data, ctx) {
        data = this.statisticsDatasetManager.formatData(data)
        const chart = new Chart(ctx, statisticsChartConfig(data));
        return chart;
    }
}