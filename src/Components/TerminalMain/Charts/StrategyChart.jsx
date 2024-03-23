import {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {StrategyChartsFactory} from "../../../Logic/StrategyLogic/StrategyChartsFactory.js";

export function StrategyChart({ data, graphType }) {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
            const chartInstance = StrategyChartsFactory.CreateChart(data, ctx, graphType);

            return () => {
                chartInstance.destroy();
            };
        }
    }, [data, graphType]);

    return <canvas ref={chartContainer} />;
}

StrategyChart.propTypes = {
    data: PropTypes.object.isRequired,
};
