import {Fragment, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {StrategyChartsFactory} from "../../../../Logic/StrategyLogic/StrategyChartsFactory.js";
import {connect} from "react-redux";
import {StrategyTransmitter} from "../../../../Logic/StrategyLogic/StrategyTransmitter.js";
import Loading from "../../../Common/Loading/Loading.jsx";
import {getCurrentTimeInISOFormat} from "../../../../Logic/StrategyLogic/Utils/CurrentTimeForJson.js";

const StrategyChart = ({ candleInterval, strategy, graphType }) => {
    const chartContainer = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCandlesStrategies = async () => {
            const params = {
                'from': getCurrentTimeInISOFormat(),
                'figi': 'BBG004730N88',
                'interval': candleInterval,
                'candleLength': 150,
                'strategiesNames': strategy
            };

            setError(null);
            setLoading(true);
            await StrategyTransmitter.GetCandlesStrategyFixedPeriodFromAsync(params)
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
