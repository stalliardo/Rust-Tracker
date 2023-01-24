import axios from "axios";

const battlemetricsURL = "https://api.battlemetrics.com";

// tataris id = 5967676
export const getServerById = (serverId) => {
    return axios.get(`${battlemetricsURL}/servers/${serverId}`);
}

export const searchServers = (searchTerm) => {
    return axios.get(`${battlemetricsURL}/servers?filter[search]=${searchTerm}`);
}
