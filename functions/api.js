// All api functions will go here

const axios = require("axios");

// get the servers by the array of ids
const ids = ["15111552", "5967676"];

// https://api.battlemetrics.com/servers?filter[ids][whitelist]=15111552,5967676
// const battlemetricsURL = "https://api.battlemetrics.com";
// axios.defaults.baseURL = battlemetricsURL;


exports.getServers = async () => {
    return axios.get(`https://api.battlemetrics.com/servers?filter[ids][whitelist]=${ids}`);
}

// exports.getPlayerStatus = async (serverId) => {
//     return axios.get(`https://api.battlemetrics.com/players/1120601975?include=server&filter[servers]=${serverId}`)
// }

exports.getPlayerStatusForServer = async (playerId, serverId) => {
    return axios.get(`https://api.battlemetrics.com/players/${playerId}?include=server&filter[servers]=${serverId}`)
}