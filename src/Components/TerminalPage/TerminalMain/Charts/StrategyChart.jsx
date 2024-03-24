import {Fragment, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {StrategyChartsFactory} from "../../../../Logic/StrategyLogic/StrategyChartsFactory.js";
import {connect} from "react-redux";
import {StrategyTransmitter} from "../../../../Logic/StrategyLogic/StrategyTransmitter.js";
import Loading from "../../../Common/Loading/Loading.jsx";

const StrategyChart = ({ candleInterval, strategy, graphType }) => {
    const chartContainer = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCandlesStrategies = async () => {
            const params = {
                'from': '2023-01-05T00:00:00Z',
                'to': '2023-01-06T00:00:00Z',
                'figi': 'BBG004730N88',
                'interval': candleInterval,
                'strategiesNames': strategy
            };

            setError(null);
            setLoading(true);
            await StrategyTransmitter.GetCandlesStrategyAsync(params)
                .then(res => {setData(res);})
                .catch(error => {setError(error);})
                .finally(() => setLoading(false));
        };

        fetchCandlesStrategies();
    }, [candleInterval, strategy, graphType]);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
            const chartInstance = StrategyChartsFactory.CreateChart(data, ctx, graphType);

            return () => {
                chartInstance.destroy();
            };
        }
    }, [data]);

    return (
        <Fragment>
            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <div className="Error">Error: {error.message}</div>
                ) : (
                    <canvas ref={chartContainer} />
                )
            }
        </Fragment>
    )
}

StrategyChart.propTypes = {
    candleInterval: PropTypes.string.isRequired,
    strategy: PropTypes.string.isRequired,
    graphType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    graphType: state.graphType,
    strategy: state.strategy,
    candleInterval: state.candleInterval
});

const ConnectedStrategyChart = connect(mapStateToProps)(StrategyChart);
export default ConnectedStrategyChart;
