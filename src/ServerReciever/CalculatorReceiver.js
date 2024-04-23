import MainServeURL from "../../config.js";
import axios from "axios";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";

export class CalculatorReceiver {
    static async getCalculatedAmount(params) {
        const API_URL = MainServeURL + "api/calculator/get-amount";
        return new Promise((resolve, reject) => {
            axios.get(API_URL, {
                params: params,
                headers: {'Authorization': `Bearer ${TraderToken.getToken()}`}
            })
                .then(response => {
                    console.log(response)
                    resolve(response.data.amount);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static async getCalculatorNames() {
        const API_URL = MainServeURL + "api/calculator/get-calculator-names";
        return new Promise((resolve, reject) => {
            axios.get(API_URL, {
                headers: {'Authorization': `Bearer ${TraderToken.getToken()}`}})
                .then(response => {
                    resolve(response.data.calculatorNames);
                })
                .catch(error => {
                    console.log(error)
                    reject(error);
                });
        });
    }
}