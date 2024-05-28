import { StatisticsReceiver } from "../../ServerReciever/StatisticsReceiver.js";

export class StatisticsLogic {
    static async getStatistics(from, to, pageName) {
        const params = {
            "from": from,
            "to": to,
            "pageName": pageName
        };

        return StatisticsReceiver.getStatistics(params);
    }

    static createPageVisit(userId, pageName) {
        const params = {
            "userId": userId,
            "pageName": pageName
        };

        StatisticsReceiver.createPageVisit(params);
    }
}