import axios from "axios";

// const battlemetricsURL = "https://api.battlemetrics.com"; // TODO set this as the base url

// axios.defaults.baseURL = battlemetricsURL;

// https://us-central1-rust-tracker.cloudfunctions.net/refreshPlayerStatus

export const checkForPlayerStatusUpdate = (userId) => {
    return axios.get(`https://us-central1-rust-tracker.cloudfunctions.net/refreshPlayerStatus?userId=${userId}`);
}