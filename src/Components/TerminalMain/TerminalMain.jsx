import "./TerminalMain.css"
import {StrategyChart} from "./Charts/StrategyChart.jsx";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading.jsx";
import {StrategyTransmitter} from "../../Logic/StrategyLogic/StrategyTransmitter.js";

export function TerminalMain({ terminalPageContainer }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCandlesStrategies = async () => {
            const params = {
                'from': '2023-01-05T00:00:00Z',
                'to': '2023-01-06T00:00:00Z',
                'figi': 'BBG004730N88',
                'interval': terminalPageContainer['candleInterval'],
                'strategiesNames': terminalPageContainer['strategy'] || ''
            };

            setError(null);
            setLoading(true);
            await StrategyTransmitter.GetCandlesStrategyAsync(params)
                .then(res => {setData(res);})
                .catch(error => {setError(error);})
                .finally(() => setLoading(false));
        }

        fetchCandlesStrategies();
    }, [terminalPageContainer['candleInterval'], terminalPageContainer['strategy']]);

    return (
        <div className="TerminalContainer">
            <div className="TerminalMain">
                {loading ? (
                    <Loading />
                ) : (
                    error ? (
                        <div className="Error">Error: {error.message}</div>
                    ) : (
                        <StrategyChart data={data} graphType={terminalPageContainer["graphType"]}/>
                    )
                )}
            </div>
        </div>
    );
}

TerminalMain.propTypes = {
    terminalPageContainer: PropTypes.object.isRequired
};
