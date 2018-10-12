let express = require('express');
let router = express.Router();
var updatePlayer = require('../../cronjob/updatePlayerStat');

// players and matches stats 
let Players = require('../../models/stats/player');
let T20 = require('../../models/stats/t20Match');
let Odi = require('../../models/stats/odiMatch');
let Test = require('../../models/stats/testMatch');

//get all players
router.get('/', (req, res) => {
    Players.find({}, (errPlayer, player) => {
        T20.find({}, (errT20, t20Match) => {
            Odi.find({}, (errOdi, odiMatch) => {
                Test.find({}, (errTest, testMatch) => {
                    res.json({ 'player': player, 't20Match': t20Match, 'odiMatch': odiMatch, 'testMatch': testMatch });
                });
            });
        });
    });
    console.log("Players data " + res);
});

// get players by id
router.get('/:id', (req, res) => {
    var pid = req.params.id;
    Players.find({ _id: pid }, (errPlayer, players) => {
        T20.find({ player_id: pid }, (errT20, t20) => {
            Odi.find({ player_id: pid }, (errOdi, odi) => {
                Test.find({ player_id: pid }, (errTest, test) => {
                    res.json({ 'player': players, 't20': t20, 'odi': odi, 'test': test });
                });
            });
        });
    });
    console.log(res.player);
});

router.get('/add', (req, res) => {
    console.log("Inside the player add");
    updatePlayer.addPlayer();
});


module.exports = router;








