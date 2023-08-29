// All api functions will go here

import axios from "axios";


export const getPlayerStatusForServer = (async(playerId, serverId) => {
    return axios.get(`https://api.battlemetrics.com/players/${playerId}?include=server&filter[servers]=${serverId}`)
})