import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {TraderToken} from "../Logic/TraderToken.js";
import MainServeURL from "../../config.js";

export class StrategySocketReceiver {
    constructor() {
        this.stompClient = null;
        this.isConnected = false;
    }

    async connectToLiveData(params, callBackFunction) {
        if (this.isConnected) {
            console.log("Already connected to live data.");
            return;
        }

        const socket = new SockJS(MainServeURL + 'live-data');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({Authorization: `Bearer ${TraderToken.getToken()}`}, () => {
            this.isConnected = true;
            console.log("Connected to live data.");

            this.stompClient.subscribe('/topic/live-data-message', function(message) {
                callBackFunction(JSON.parse(message.body));
            });
        }, (error) => {
            console.error("Error connecting to live data:", error);
        });
    }

    async disconnect() {
        if (!this.isConnected) {
            console.log("Already disconnected.");
            return;
        }

        if (this.stompClient) {
            this.stompClient.disconnect();
            this.stompClient = null;
            this.isConnected = false;
        }
    }
}
