import MainServeURL from "../../config.js";
import axios from "axios";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";

export class StatisticsReceiver {
    static async getStatistics(params) {
        const API_URL = MainServeURL + "api/statistics/get-statistics-pages-visited";
        return new Promise((resolve, reject) => {
            axios.get(API_URL, {
                params: params,
                headers: {'Authorization': `Bearer ${TraderToken.getToken()}`}
            })
                .then(response => {
                    resolve(response.data.statisticsPageVisited);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static async getPageNames() {
        const API_URL = MainServeURL + "api/statistics/get-pages-names";
        return new Promise((resolve, reject) => {
            axios.get(API_URL, {
                headers: {'Authorization': `Bearer ${TraderToken.getToken()}`}
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static createPageVisit(params) {
        const API_URL = MainServeURL + "api/statistics";
        return new Promise((resolve, reject) => {
            axios.post(API_URL, params, {
                headers: {'Authorization': `Bearer ${TraderToken.getToken()}`}
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}