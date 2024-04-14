import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {TraderToken} from "../Logic/TraderToken.js";

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

        const socket = new SockJS('http://localhost:8080/live-data');
        this.stompClient = Stomp.over(socket);
        const headers = { 'Authorization': `Bearer ${TraderToken.getToken()}` };

        this.stompClient.connect({}, () => {
            this.isConnected = true;
            this.stompClient.send('/app/start-live-data', { headers: headers }, JSON.stringify(params));

            this.stompClient.subscribe('/topic/live-data-message', function(message) {
                callBackFunction(JSON.parse(message.body));
            });
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
