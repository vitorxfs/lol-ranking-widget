const axios = require("axios");

//  Connection settings to League of Legends API
const instance = axios.create({
    baseURL: 'https://br1.api.riotgames.com',
    timeout: 3000,
    headers: {'X-Riot-Token': process.env.LOL_API_KEY}
});

module.exports = instance;