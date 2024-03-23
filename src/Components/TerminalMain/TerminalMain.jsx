import "./TerminalMain.css"
import {CandleChart} from "./Charts/CandleChart.jsx";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading.jsx";
import {StrategyTransmitter} from "../../Logic/StrategyTransmitter.js";
import {StrategyCandleDivider} from "../../Logic/StrategyCandleDivider.js";

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
                'interval': terminalPageContainer['candleInterval'] || "CANDLE_INTERVAL_1_MIN",
                'strategiesNames': terminalPageContainer['strategy'] || ""
            };

            setError(null);
            setLoading(true);
            await StrategyTransmitter.GetCandlesStrategyAsync(params)
                .then(res => {
                    const dividedParams = StrategyCandleDivider.CandlesStrategyDivision(res);
                    setData(dividedParams);
                })
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
                        <CandleChart data={data}/>
                    )
                )}
            </div>
        </div>
    );
}

TerminalMain.propTypes = {
    terminalPageContainer: PropTypes.object.isRequired
};
