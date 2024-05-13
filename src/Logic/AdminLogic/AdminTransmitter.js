import {AdminReceiver} from "../../ServerReciever/AdminReceiver.js";

export class AdminTransmitter {
    static async GetTradersPages(page, pageSize) {
        const params = {
            "page": page,
            "pageSize": pageSize
        };

        return await AdminReceiver.GetTradersPages(params);
    }

    static async GetSearchedTradersPages(page, pageSize, searchString) {
        const params = {
            "page": page,
            "pageSize": pageSize,
            "searchString": searchString
        };

        return await AdminReceiver.GetSearchedTradersPages(params);
    }

    static async GetCountAllTraders() {
        return await AdminReceiver.GetCountAllTraders();
    }

    static async GetCountStatusTraders(status) {
        const params = {
            "status": status
        };

        return await AdminReceiver.GetCountStatusTraders(params);
    }
}