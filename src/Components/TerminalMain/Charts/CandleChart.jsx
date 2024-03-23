import 'chartjs-adapter-date-fns';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
import {CrosshairPlugin} from 'chartjs-plugin-crosshair';
import Chart from 'chart.js/auto';
Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController, CrosshairPlugin);

import {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {StrategyCharts} from "../../../Logic/StrategyCharts.js";

export function CandleChart({ data }) {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const candlesToDisplay = 200;
            const {datasets, yAxisConfig} = StrategyCharts.CreateDifferentDatasetsAndPositions(data, candlesToDisplay);

            const ctx = chartContainer.current.getContext('2d');
            const chartInstance = new Chart(ctx, {
                type: "candlestick",
                data: {
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    animation: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        },
                        crosshair: {
                            line: {
                                color: 'white',
                                width: 1
                            },
                            sync: {
                                enabled: true,
                                suppressTooltips: false
                            },
                            zoom: {
                                enabled: false,
                            },
                        }
                    },
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
    data: PropTypes.object.isRequired,
};
