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

    static getTraderIdFromToken() {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = atob(token.split('.')[1]); // Decoding the middle part of the JWT token
                const { id } = JSON.parse(decodedToken);
                return id;
            } catch (error) {
                console.error('Error decoding JWT token:', error);
                return null;
            }
        } else {
            console.error('JWT token not found in local storage');
            return null;
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