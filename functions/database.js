import admin from 'firebase-admin';
import { getPlayerStatusForServer } from "./api.js";

export async function generateApiQueryFromAlerts() {
    const alerts = await admin.firestore().collection("alerts").get();
    const promises = [];

    if (alerts.empty) {
        console.log("empty called");
        return [];
    } else {

        // returns the unique server ids, so these can be added to the api call
        // Dont need to do this now instead build an array of promises that calls the players api

        alerts.forEach((alert) => {
            promises.push(getPlayerStatusForServer(alert.data().playerId, alert.data().serverId));
        })
    }

    return promises;
}