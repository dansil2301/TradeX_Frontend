import MainServeURL from "../../config.js";
import axios from "axios";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";

export class AdminReceiver {
    static GetTradersPages(params) {
        const API_URL = MainServeURL + `api/traders/pages`;
        return new Promise((resolve, reject) => {
            axios.get(API_URL, params, {
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

    static GetSearchedTradersPages(params) {
        const API_URL = MainServeURL + `api/traders/search`;
        return new Promise((resolve, reject) => {
            axios.get(API_URL, params, {
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

    static GetCountAllTraders() {
        const API_URL = MainServeURL + `api/traders/countAllTraders`;
        return new Promise((resolve, reject) => {
            axios.get(API_URL, {
                headers: {'Authorization': `Bearer ${TraderToken.getToken()}`}})
                .then(response => {
                    resolve(response.data.total);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static GetCountStatusTraders(params) {
        const API_URL = MainServeURL + `api/traders/countAllStatusTraders`;
        return new Promise((resolve, reject) => {
            axios.get(API_URL, {
                params: params,
                headers: {'Authorization': `Bearer ${TraderToken.getToken()}`}
            })
                .then(response => {
                    resolve(response.data.total);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}