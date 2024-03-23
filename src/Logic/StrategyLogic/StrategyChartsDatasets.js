const separateGraph = [
    'rsi'
]

export class StrategyChartsDatasets {
    static candleDatasetCreation(data, candlesToDisplay, graphType) {
        if (graphType === "candle") {
            return ({
                type: 'candlestick',
                data: data["candles"].slice(-candlesToDisplay),
                yAxisID: "y",
                backgroundColor: "gray",
            });
        }
        else if (graphType === "line") {
            return ({
                type: 'line',
                data: data["candles"].map(candle => ({x: candle.x, y: candle.c})).slice(-candlesToDisplay),
                yAxisID: "y",
                backgroundColor: "#4D637C",
                borderColor: '#4D637C',
                pointRadius: 0,
            });
        }
    }

    static lineDatasetCreation(data, strategy, candlesToDisplay, type) {
        const yAxisID = type === "separate" ? "ySEP" : "y";
        return ({
            label: strategy,
            data: data["strategies"][strategy].slice(-candlesToDisplay),
            yAxisID: yAxisID,
            type: "line",
            backgroundColor: "white",
            borderColor: 'white',
            borderWidth: 2,
            pointRadius: 0,
        });
    }

    static CreateDifferentDatasetsAndPositions(data, candlesToDisplay, graphType) {
        const yAxisConfig = {};
        let datasets = [];

        datasets.push(this.candleDatasetCreation(data, candlesToDisplay, graphType));

        for (const strategy in data["strategies"]) {
            if (separateGraph.includes(strategy)) {
                datasets.push(this.lineDatasetCreation(data, strategy, candlesToDisplay, "separate"));
                yAxisConfig["ySEP"] = { position: 'right', stack: 'demo', stackWeight: 1 };
            }
            else {
                datasets.push(this.lineDatasetCreation(data, strategy, candlesToDisplay, "mixed"));
            }
        }

        return {datasets, yAxisConfig};
    }
}