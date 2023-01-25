import axios from "axios";

const battlemetricsURL = "https://api.battlemetrics.com"; // TODO set this as the base url

// tataris id = 5967676
export const getServerById = (serverId) => {
    return axios.get(`${battlemetricsURL}/servers/${serverId}`);
}

export const searchServers = (searchTerm) => {
    return axios.get(`${battlemetricsURL}/servers?filter[search]=${searchTerm}&page[size]=50`); // TODO Dynamic size and account type restricted
}
