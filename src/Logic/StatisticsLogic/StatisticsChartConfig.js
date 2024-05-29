export const statisticsChartConfig = (data) => {
    return ({
        type: "bar",
        data: {
            datasets: [{
                label: 'My Dataset',
                data: data,
                borderColor: 'rgba(117, 169, 248, 1)',
                backgroundColor: 'rgba(117, 169, 248, 0.2)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                    title: {
                        display: false,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Visited'
                    },
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return Number.isInteger(value) ? value : null;
                        }
                    }
                }
            }
        }
    });
};