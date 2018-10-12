let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
var http = require('http');
const cronJob = require('node-schedule');
var syncLoop = require('sync-loop');

const players = require('../models/stats/player');
const ODI = require('../models/stats/odiMatch');
const Ttwenty = require('../models/stats/t20Match');
const TestMatch = require('../models/stats/testMatch');

let apiKey = "Uem9jinBeuVl29OcoU8iVAvFGyE2";

let addPlayer = function (player, callBackFun) {
    const Player = new players();
    const Test = new TestMatch();
    const Odi = new ODI();
    const T20 = new Ttwenty();

    Player.player_name = player.name;
    Player.player_type = player.playingRole;
    Player.image = player.imageURL;
    Player.profile_details = player.profile;
    Player.api_id = player.pid;
    Player.player_flag = true;
    Player.created_date = new Date();

    T20.player_id = player.pid;
    T20.no_matches = player.data.batting.T20Is.Mat;
    T20.runs_scored = player.data.batting.T20Is.Runs;
    if (player.data.bowling.T20Is.Wkts === "-")
    { T20.average = 0; }
    else
    { T20.average = player.data.batting.T20Is.Ave; }


    T20.no_100 = player.data.batting.T20Is['100'];
    T20.no_50 = player.data.batting.T20Is['50'];
    if (player.data.bowling.T20Is.Wkts === "-")
    { T20.no_wickets = 0; }
    else
    { T20.no_wickets = player.data.bowling.T20Is.Wkts; }

    if (player.data.bowling.T20Is.Wkts === "-")
    { T20.economy = 0; }
    else
    { T20.economy = player.data.bowling.T20Is.Econ; }

    T20.top_score = "";

    Odi.player_id = player.pid;
    Odi.no_matches = player.data.batting.ODIs.Mat;
    Odi.runs_scored = player.data.batting.ODIs.Runs;
    Odi.average = player.data.batting.ODIs.Ave;
    Odi.no_100 = player.data.batting.ODIs['100'];
    Odi.no_50 = player.data.batting.ODIs['50'];
    Odi.no_wickets = player.data.bowling.ODIs.Wkts;
    Odi.economy = player.data.bowling.ODIs.Econ;
    Odi.top_score = "";

    Test.player_id = player.pid;
    Test.no_matches = player.data.batting.tests.Mat;
    Test.runs_scored = player.data.batting.tests.Runs;
    Test.average = player.data.batting.tests.Ave;
    Test.no_100 = player.data.batting.tests['100'];
    Test.no_50 = player.data.batting.tests['50'];
    Test.no_wickets = player.data.bowling.tests.Wkts;
    Test.economy = player.data.bowling.tests.Econ;
    Test.top_score = "";

    //logger.info("playerDetails : "+JSON.stringify(playerDetails));
    Player.save((error, result) => {
        if (error) throw error;

        console.log("Player inserted !!!");

        T20.player_id = result._id;
        //logger.info("tTwenty : "+JSON.stringify(tTwenty));
        T20.save((error1, result1) => {
            if (error1) throw error1;

            console.log("T20 inserted !!!");
            Odi.player_id = result._id;
            //logger.info("oneDayInternational : "+JSON.stringify(oneDayInternational));
            Odi.save((error2, result2) => {
                if (error2) throw error2;

                console.log("ODI inserted !!!");
                Test.player_id = result._id;

                // console.log("testMatch : "+JSON.stringify(testMatch));
                Test.save((error3, result3) => {
                    if (error3) throw error3;

                    console.log("Test inserted !!!");
                    callBackFun();
                });
            });
        });
    });
}

// var PIdList = ["253802", "28081", "36084", "34102", "35263", "625371"];
625371

var PIdList = ["35320", "253802", "36084", "34102", "625371"];
var numberOfLoop = 5;
let body = '';

// var j = cronJob.scheduleJob('*/20 * 23 * * *', function () {
//     console.log("Cron job started");

//     syncLoop(numberOfLoop, function (loop) {
//         var index = loop.iteration();

//         console.log("index : " + index);
//         let pid = PIdList[index];

//         let url = `http://cricapi.com/api/playerStats/?apikey=${apiKey}&pid=${pid}`;
//         console.log("url : " + url);

//         let urlencodeParser = bodyParser.urlencoded({ extended: false });

//         let request = http.request(url, (response) => {
//             response.on('data', function (chunk) {
//                 body += chunk;
//             });

//             response.on('end', function () {
//                 var player = JSON.parse(body);
//                 console.log("Came here with pid : " + pid)
//                 addPlayer(player, () => {
//                     body = "";
//                     loop.next(); 
//                 });
//             });
//         }).end();
//     }, function () {
//         console.log("Data inserted successfully!!!")
//     });
// })

module.exports = router;
