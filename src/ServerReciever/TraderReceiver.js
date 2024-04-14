import MainServeURL from "../../config.js";
import axios from "axios";

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
}