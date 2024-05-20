import {TraderReceiver} from "../../ServerReciever/TraderReceiver.js";
import {TraderToken} from "./TraderToken.js";

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

    static async EditTrader(id, username, email, status) {
        const params = {
            username: username,
            email: email,
            status: status
        }

        await TraderReceiver.EditTrader(id, params);
    }

    static async DeleteTrader(id) {
        await TraderReceiver.DeleteTrader(id);
    }

    static async GetTraderById(id) {
        return await TraderReceiver.GetTraderById(id);
    }
}