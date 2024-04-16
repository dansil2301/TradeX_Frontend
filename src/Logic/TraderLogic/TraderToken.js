import {TraderReceiver} from "../../ServerReciever/TraderReceiver.js";
import {StrategyReceiver} from "../../ServerReciever/StrategyReceiver.js";

export class TraderToken {
    static getAndSaveToken(email, password) {
        const params = {
            'email': email,
            'password': password,
        };

        return TraderReceiver.GetAccessToken(params);
    }

    static async checkIfTokenIsValid() {
        try {
            await StrategyReceiver.GetStrategiesNamesAsync();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    static saveToken(token) {
        localStorage.setItem('accessToken', token);
    }

    static getToken() {
        return localStorage.getItem('accessToken');
    }

    static clearToken() {
        localStorage.removeItem('accessToken');
    }
}