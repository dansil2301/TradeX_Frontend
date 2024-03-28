export const strategyChart = (datasets, limits, yAxisConfig) => {
    return ({
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

const plugins = (limits)=> {
    return ({
        legend: {
            display: false
        },
        tooltip: {
            mode: 'index',
            intersect: false
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
                onPan: () => {

                }
            },
            zoom: {
                pinch: {
                    enabled: true
                },
                wheel: {
                    enabled: false
                },
                mode: 'x'
            },
            limits: limits,
        }
    });
};

const scales = (yAxisConfig) => {
    return ({
        x: {
            type: "timeseries",
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
