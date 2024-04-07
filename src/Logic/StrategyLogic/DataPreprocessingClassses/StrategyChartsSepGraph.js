import {separateGraph} from "./separateGraphConfig.js";

export class StrategyChartsSepGraph {
    static GetYAxisConfig(datasets) {
        let yAxisConfig = {};
        for(const datasetIndex in datasets) {
            if (separateGraph.includes(datasets[datasetIndex].label)) {
                yAxisConfig["ySEP"] = { position: 'right', stack: 'demo', stackWeight: 1, offset: true };
                break;
            }
        }
        return yAxisConfig;
    }
}