import {Fragment, useEffect, useRef, useState} from "react";
import Loading from "../../../../Common/Loading/Loading.jsx";
import {SignIn} from "../../../../Common/SignIn/SignIn.jsx";
import {StatisticsChartFactory} from "../../../../../Logic/StatisticsLogic/StatisticsChartFactory.js";
import {StatisticsLogic} from "../../../../../Logic/StatisticsLogic/StatisticsLogic.js";

export function StatisticsChart({ pageName, fromDate, toDate }) {
    const chartFactory = new StatisticsChartFactory();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const chartContainer = useRef(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            setError(null);
            setLoading(true);
            pageName = pageName !== "All" ? pageName : "";
            StatisticsLogic.getStatistics(fromDate, toDate, pageName)
                .then(res => {setData(res);})
                .catch(error => {setError(error);})
                .finally(() => setLoading(false));
        };

        fetchStatistics();
    }, [pageName, fromDate, toDate]);

    useEffect(() => {
        async function creatChart() {
            if (chartContainer && chartContainer.current) {
                const ctx = chartContainer.current.getContext('2d');
                const chartInstance = await chartFactory.createChart(data, ctx);

                return () => {
                    chartInstance.destroy();
                };
            }
        }

        creatChart();
    }, [data]);

    return (
        <Fragment>
            {
                loading ? (
                    <Loading />
                ) : error && error.message.includes('401') ? (
                    <div className="SignInTerminalCentering"> <SignIn /> </div>
                ) : error ? (
                    <div className="Error">Error: {error.message}</div>
                ) : (
                    <canvas ref={chartContainer} className="statisticsChart"/>
                )
            }
        </Fragment>
    );
}