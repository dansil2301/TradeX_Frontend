import {TraderReceiver} from "../ServerReciever/TraderReceiver.js";

export class TraderToken {
    static getAndSaveToken(email, password) {
        const params = {
            'email': email,
            'password': password,
        };

        return TraderReceiver.GetAccessToken(params);
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