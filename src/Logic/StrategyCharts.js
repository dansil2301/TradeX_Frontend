const separateGraph = [
    'rsi'
]

export class StrategyCharts {
    static CreateDifferentDatasetsAndPositions(data, candlesToDisplay) {
        const yAxisConfig = {};
        let datasets = []
        let count = 2;

        datasets.push({
            data: data["candles"].slice(-candlesToDisplay),
            yAxisID: "y",
            backgroundColor: "gray",
        });

        for (const strategy in data["strategies"]) {
            if (separateGraph.includes(strategy)) {
                const yAxisID = "y" + count;
                datasets.push({
                    label: strategy,
                    data: data["strategies"][strategy].slice(-candlesToDisplay),
                    yAxisID: yAxisID,
                    type: "line",
                    backgroundColor: "white",
                    borderColor: 'white',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointStyle: 'none',
                });
                yAxisConfig[yAxisID] = { position: 'right', stack: 'demo', stackWeight: 1, };
                count++;
            }
            else {
                datasets.push({
                    label: strategy,
                    data: data["strategies"][strategy].slice(-candlesToDisplay),
                    type: "line",
                    backgroundColor: "white",
                    borderColor: 'white',
                    pointRadius: 0,
                    borderWidth: 2,
                });
            }
        }

        return {datasets, yAxisConfig};
    }
}