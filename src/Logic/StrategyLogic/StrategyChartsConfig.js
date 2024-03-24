export const plugins = (limits)=> {
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
                mode: 'x'
            },
            zoom: {
                pinch: {
                    enabled: true
                },
                wheel: {
                    enabled: true
                },
                mode: 'x'
            },
            limits: limits,
        }
    });
};

export const scales = (yAxisConfig) => {
    return ({
        x: {
            type: "time",
            time: {
                unit: "minute",
            },
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

