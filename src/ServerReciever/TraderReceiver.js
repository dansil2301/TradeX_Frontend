import MainServeURL from "../../config.js";
import axios from "axios";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";

export class TraderReceiver {
    static GetAccessToken(params) {
        const API_URL = MainServeURL + "api/tokens";
        return new Promise((resolve, reject) => {
            axios.post(API_URL, params)
                .then(response => {
                    resolve(response.data.accessToken);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static CreateTrader(params) {
        const API_URL = MainServeURL + "api/traders";
        return new Promise((resolve, reject) => {
            axios.post(API_URL, params)
                .then(response => {
                    resolve(response.data.accessToken);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static EditTrader(id, params) {
        const API_URL = MainServeURL + `api/traders/${id}`;
        return new Promise((resolve, reject) => {
            axios.put(API_URL, params, {
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

    static DeleteTrader(id) {
        const API_URL = MainServeURL + `api/traders/${id}`;
        return new Promise((resolve, reject) => {
            axios.delete(API_URL, {
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

    static GetTraderById(id) {
        const API_URL = MainServeURL + `api/traders/${id}`;
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
}