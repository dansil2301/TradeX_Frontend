import "./TerminalMain.css"
import {CandleChart} from "./Charts/CandleChart.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import MainServeURL from "../../../config.js";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading.jsx";

export function TerminalMain({ terminalPageContainer }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [candles, setCandles] = useState([]);

    const convertCustomCandlesToChartjs = (candle) => {
        return {
            x: Date.parse(candle.time),
            o: candle.open,
            h: candle.high,
            l: candle.low,
            c: candle.close,
            v: candle.volume
        };
    }

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
            axios.get(MainServeURL + "api/strategies/get-strategy-params-without-candles", {
                params: params
            })
                .then(res => {
                    setCandles(
                        res.data.strategiesParams
                            .map(candleStrategy => convertCustomCandlesToChartjs(candleStrategy.candle))
                    );
                })
                .catch(error => {
                    setError(error);
                })
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
                        <CandleChart data={candles}/>
                    )
                )}
            </div>
        </div>
    );
}

TerminalMain.propTypes = {
    terminalPageContainer: PropTypes.object.isRequired
};
