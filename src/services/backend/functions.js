import axios from "axios";

export const checkForPlayerStatusUpdate = (userId) => {
    return axios.get(`https://us-central1-rust-tracker.cloudfunctions.net/refreshPlayerStatus?userId=${userId}`);
}

export const configureNotificationsForAlerts = (data, alerts) => {
    data.forEach((element) => {
        console.log("element = ", element);
        const localAlert = alerts.find(alert => alert.id === element.id);
        console.log("local alert = ", localAlert);

        // check for isOnline descrepncies
        if(element.isOnline !== localAlert.isOnline) {
            console.log("This is a valid alert. Alert the user");
            // new Notification(`${element.playerName} has just ${element.isOnline ? "logged on" : "logged off"}!`);
            // TODO -> style the notification, add the site icon
            // TODO - how will lots f motifications be handled?
             new Notification(`${element.playerName} has ${element.isOnline ? "entered" : "left"} the game!`);

             // Need to add this alert to the db, so they can be displayed persistantly in the view alerts section
        }
    })
}