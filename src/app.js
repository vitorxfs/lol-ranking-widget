require('dotenv').config()
const express = require("express");

const summoner = require("./controllers/SummonerController.js");

const PORT = process.env.PORT;

const app = express();

app.set('views', __dirname + '/views'); // Setting views directory for hbs
app.set('view engine', 'hbs');          // Setting view engine to hbs

app.use('/static', express.static(__dirname + '/public'));  // Servering static files for emblem pictures

app.get("/lol/:summonerName", summoner.getSummoner);

app.listen(PORT, () => {
    console.log("Server listening on port "+PORT);
});