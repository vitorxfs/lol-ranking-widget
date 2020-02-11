const instance = require("../api/lol_api");

module.exports = { 
    async getSummoner(req, res) {
        const summonerName = req.params.summonerName;   // Get the summoner's name into request parameters
        
        try {

            // Accessing League of Legends API:
            const summoner = await instance.get(`/lol/summoner/v4/summoners/by-name/${summonerName}`);  // Gets summoner's data by its name
            const elos = await instance.get(`/lol/league/v4/entries/by-summoner/${summoner.data.id}`);  // Gets rankings gata by summoner's id
            
            const elo = elos.data.filter((elo) => elo.queueType == 'RANKED_SOLO_5x5');  // Filters solo 5x5 ranking
            if(!elo[0]){
                return res.render('index.hbs',{tier: "unranked"});  // Rendering unranked emblem
            }
            const {tier, rank, leaguePoints} = elo[0];

            // Rendering respective emblem and informations
            return res.render('index.hbs', {
                tier: tier.toLowerCase(),
                rank,
                leaguePoints: leaguePoints+' Points'
            });

        } catch (e) {
            return res.status(e.response.status).send(); // Sending error code to the client
        }
        
    }
};  