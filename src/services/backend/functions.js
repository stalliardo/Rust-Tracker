import axios from "axios";
import { updateIsOnlineProperty } from "../../features/alerts/alertsSlice";
import { addNotification } from "../database/user";

export const checkForPlayerStatusUpdate = (userId) => {
    return axios.get(`https://us-central1-rust-tracker.cloudfunctions.net/refreshPlayerStatus?userId=${userId}`);
}

export const configureNotificationsForAlerts = (data, alerts, userId, dispatch) => { // pass in dispacth????
    const addNotificationPromises = [];
    const updateData = [];

    data.forEach((element) => {
        const localAlert = alerts.find(alert => alert.id === element.id);
        if (element.isOnline !== localAlert.isOnline) {
            updateData.push({
                alertId: localAlert.id,
                isOnline: element.isOnline
            });
            new Notification(`${element.playerName} has ${element.isOnline ? "entered" : "left"} the game!`);
            console.log('%cAdding new notification...', "color: lightgreen;");
            addNotificationPromises.push(
                addNotification(userId, {
                    playerName: element.playerName,
                    serverName: element.serverName,
                    alertType: element.alertType
                })
            );
        }
    });

    if (addNotificationPromises.length) {
        Promise.all(addNotificationPromises).then(() => {
            updateData.forEach((update) => {
                dispatch(updateIsOnlineProperty(update))
            })
        }).catch(e => {
            console.error("Unable to create new notifications. Error: ", e)

        });
    }
}