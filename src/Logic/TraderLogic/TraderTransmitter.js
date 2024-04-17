import {TraderReceiver} from "../../ServerReciever/TraderReceiver.js";

export class TraderTransmitter {
    static async CreateTrader(username, email, password, status) {
        const params = {
            username: username,
            email: email,
            password: password,
            status: status
        }

        return await TraderReceiver.CreateTrader(params);
    }

    static async GetTraderById(id) {
        return await TraderReceiver.GetTraderById(id);
    }
}