const videoStreaming = require('express').Router();
const http = require('http');
const https = require('https');
//const appRoot = require('app-root-path');
const cronJob = require('node-schedule');
const axios = require('axios');
//const logger = require(`${appRoot}/config/winston.config.js`);
var channelName = 'indian cricket 2018';
var body = '';
var loopNumber = 9;
const videodata = require('../models/stats/video');
let appKey = "AIzaSyB4WM8u9WhYzY-LuchHKe04eQwGhuDfMJo";

var fetchData = async function () {
    console.log("inside fetch data");

    var details = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=indian%20cricket%202018&maxResults=${loopNumber}&key=${appKey}`);

    return details.data.items;
}

var addVideo = function (video) {
    const videoRecord = new videodata();

    console.log("data saving in process");

    videoRecord.videoDescription = video.snippet.description;
    videoRecord.videoYtID = video.id.videoId;
    videoRecord.videoURL = "";
    videoRecord.videoDuration = "";
    videoRecord.likes = 0;
    videoRecord.disLikes = 0;
    videoRecord.videoTitle = video.snippet.title;
    videoRecord.createdDate = new Date();
    videoRecord.thumbnails = video.snippet.thumbnails.default.url;

    videoRecord.save((err, result) => {
        if (err) {
            console.log("error", err);
        } else {
            console.log("data is saved");
            return;
        }
    })
};

// var j = cronJob.scheduleJob('*/20  * 23 * * *', async function () {
//     console.log("Entered videos cronJob");
//     var videodetails;
//     videodetails = await fetchData();

//     for (var index = 0; index < videodetails.length; index++) {
//         var videoItems = videodetails[index];
//         addVideo(videoItems);
//     }

//     console.log("Data inserted successfully");
// });

module.exports = videoStreaming;

