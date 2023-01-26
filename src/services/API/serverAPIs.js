import axios from "axios";

const battlemetricsURL = "https://api.battlemetrics.com"; // TODO set this as the base url

axios.defaults.baseURL = battlemetricsURL;

// tataris id = 5967676
export const getServerById = (serverId) => {
    return axios.get(`/servers/${serverId}`);
}

export const searchServers = (searchTerm) => {
    return axios.get(`/servers?filter[search]=${searchTerm}&page[size]=50`); // TODO Dynamic size and account type restricted
}


// Get players on a server and the time the started so, can use that time display the time played
// https://api.battlemetrics.com/servers/5967676?include=player,session