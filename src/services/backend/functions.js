import axios from "axios";

// const battlemetricsURL = "https://api.battlemetrics.com"; // TODO set this as the base url

// axios.defaults.baseURL = battlemetricsURL;

// https://us-central1-rust-tracker.cloudfunctions.net/refreshPlayerStatus

export const checkForPlayerStatusUpdate = (userId) => {
    return axios.get(`https://us-central1-rust-tracker.cloudfunctions.net/refreshPlayerStatus?userId=${userId}`);
}

export const configureNotificationsForAlerts = (data, alerts) => {
    // Should i display a loader when this is running as it takes some time... but, i dont think it blocks any code execution

    data.forEach((element) => {
        console.log("element = ", element);
        // get the corresponding alert from the store
        const localAlert = alerts.find(alert => alert.id === element.id);
        console.log("local alert = ", localAlert);

        // check for isOnline descrepncies
        if(element.isOnline !== localAlert.isOnline) {
            console.log("This is a valid alert. Alert the user");
            // new Notification(`${element.playerName} has just ${element.isOnline ? "logged on" : "logged off"}!`);
             new Notification("Someone has chnaged their online status")
        }
    })
}