import { StatisticsReceiver } from "../../ServerReciever/StatisticsReceiver.js";

export class StatisticsLogic {
    static async getStatistics(from, to, pageName) {
        const params = {
            "from": from,
            "to": to,
            "pageName": pageName
        };
        return await StatisticsReceiver.getStatistics(params);
    }

    static async createPageVisit(userId, pageName) {
        const params = {
            "userId": userId,
            "pageName": pageName
        };

        await StatisticsReceiver.createPageVisit(params);
    }

    static async getPageNames() {
        return await StatisticsReceiver.getPageNames();
    }
}