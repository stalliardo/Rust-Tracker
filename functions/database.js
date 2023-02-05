// ALl database functions will go here

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { getPlayerStatusForServer } = require("./api");

exports.generateApiQueryFromAlerts = async () => {
    const alerts = await admin.firestore().collection("alerts").get();
    const serverIds = [];
    const promises = [];

    if (alerts.empty) {
        console.log("empty called");
    } else {

        // returns the unique server ids, so these can be added to the api call
        // Dont need to do this now instead build an array of promises that calls the players api

        alerts.forEach((alert) => {
            promises.push(getPlayerStatusForServer(alert.data().playerId, alert.data().serverId));
        })
    }

    return promises;
}