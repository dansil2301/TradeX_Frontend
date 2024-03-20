import 'chartjs-adapter-date-fns';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
import Chart from 'chart.js/auto';
Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController);

import {useEffect, useRef} from "react";
import PropTypes from "prop-types";

export function CandleChart({ data }) {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const candlesToDisplay = 200;
            const lastNCandles = data.slice(-candlesToDisplay);

            const ctx = chartContainer.current.getContext('2d');
            const chartInstance = new Chart(ctx, {
                type: "candlestick",
                data: {
                    datasets: [{
                        label: 'Candlestick Chart',
                        data: lastNCandles,
                        yAxisID: "y",
                    }]
                },
                options: {
                    responsive: true,
                    animation: false,
                    maintainAspectRatio: false,
                    scales: {
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
                    },
                }
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [data]);

    return <canvas ref={chartContainer} />;
}

CandleChart.propTypes = {
    data: PropTypes.array.isRequired,
};
