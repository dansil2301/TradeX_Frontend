let globalLimits;
let isFetchingData = false;

export const strategyChart = (datasets, limits, yAxisConfig, getNewZooming, updateDatasets, fetchExtraData) => {
    globalLimits = limits;
    return ({
        type: "candlestick",
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            animation: false,
            maintainAspectRatio: false,
            plugins: plugins(getNewZooming, updateDatasets, fetchExtraData),
            scales: scales(yAxisConfig),
        }
    });
}

const plugins = (getNewZooming, updateDatasets, fetchExtraData)=> {
    return ({
        legend: {
            display: false
        },
        tooltip: {
            mode: 'index',
            intersect: false
        },
        zoom: {
            //limits: globalLimits,
            pan: {
                enabled: true,
                mode: 'x',
                onPan: async ({chart}) => {
                    const chartArea = chart.chartArea;
                    const xScale = chart.scales['x'];
                    const minIndex = xScale.getValueForPixel(chartArea.left);
                    const maxIndex = xScale.getValueForPixel(chartArea.right);
                    const rangeToTrigger = globalLimits.x.minRange * 0.9 // render range made a bit wider

                    if (!isFetchingData && minIndex <= globalLimits.x.min + rangeToTrigger) {
                        isFetchingData = true;
                        fetchExtraData(false)
                            .then(async data => {
                                await updateDatasets(chart, data, false);
                                chart.update();
                                globalLimits = getNewZooming(chart.data.datasets[0].data);
                            })
                            .catch(error => console.error(error.message))
                            .finally(() => { isFetchingData = false; })
                    }
                    if (!isFetchingData && maxIndex >= globalLimits.x.max - rangeToTrigger) {
                        isFetchingData = true;
                        fetchExtraData(true)
                            .then(async data => {
                                await updateDatasets(chart, data, true);
                                chart.update();
                                globalLimits = getNewZooming(chart.data.datasets[0].data);
                            })
                            .catch(error => console.error(error.message))
                            .finally(() => { isFetchingData = false; })
                    }
                },
            },
            zoom: {
                pinch: {
                    enabled: true
                },
                wheel: {
                    enabled: false
                },
                mode: 'x',
            },
        }
    });
};

const scales = (yAxisConfig) => {
    return ({
        x: {
            type: 'timeseries',
            offset: false,
        },
        y: {
            position: "right",
            beginAtZero: false,
            stackWeight: 3,
            stack: 'demo',
            ticks: {
                color: "white",
            },
            border: {
                color: "white", width: 2
            },
            grid: {
                drawOnChartArea: false,
                lineWidth: 2,
                offset: false,
                tickColor: "white",
            },
        },
        ...yAxisConfig,
    });
}
