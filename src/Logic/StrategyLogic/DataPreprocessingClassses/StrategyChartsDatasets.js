const separateGraph = [
    'rsi'
]

export class StrategyChartsDatasets {

    static candleDatasetCreation(data, graphType) {
        if (graphType === "candle") {
            return ({
                label: 'Market data',
                type: 'candlestick',
                data: data["candles"],
                yAxisID: "y",
            });
        }
        else if (graphType === "line") {
            return ({
                label: 'Market data',
                type: 'line',
                data: data["candles"].map(candle => ({x: candle.x, y: candle.c})),
                yAxisID: "y",
                backgroundColor: "#4D637C",
                borderColor: '#4D637C',
                pointRadius: 0,
            });
        }
    }

    static lineDatasetCreation(data, strategy, type) {
        const yAxisID = type === "separate" ? "ySEP" : "y";
        return ({
            label: strategy,
            data: data["strategies"][strategy],
            yAxisID: yAxisID,
            type: "line",
            backgroundColor: "white",
            borderColor: 'white',
            borderWidth: 2,
            pointRadius: 0,
        });
    }

    static CreateDifferentDatasetsAndPositions(data, graphType) {
        let datasets = [];
        datasets.push(this.candleDatasetCreation(data, graphType));

        for (const strategy in data["strategies"]) {
            if (separateGraph.includes(strategy)) {
                datasets.push(this.lineDatasetCreation(data, strategy, "separate"));
            }
            else {
                datasets.push(this.lineDatasetCreation(data, strategy, "mixed"));
            }
        }

        return datasets;
    }
}