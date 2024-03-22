import axios from "axios";
import MainServeURL from "../../config.js";

export class StrategyReceiver {
    static async GetStrategiesNamesAsync() {
        const API_URL = MainServeURL + "api/strategies/get-strategies-names";
        return new Promise((resolve, reject) => {
            axios.get(API_URL)
                .then(response => {
                    resolve(response.data.strategyNames);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static async GetCandlesStrategyAsync(params) {
        const API_URL = MainServeURL + "api/strategies/get-strategy-params-without-candles";
        return new Promise((resolve, reject) => {
            axios.get(API_URL, {params})
                .then(response => {
                    resolve(response.data.strategiesParams);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}