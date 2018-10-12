let express = require('express');
let router = express.Router();
let async = require('async');
var updateVideo = require('../../cronjob/videoUpdate');
const os = require('os');
var userInfo = os.userInfo();

let Video = require('../../models/stats/video');
let user = require('../../models/user');
let videoLike = require('../../models/stats/videoLikeStatus');
let videoComment = require('../../models/stats/videoComment');


let assert = require('assert');

router.get('/', async (req, res) => {
    try {
        videoDetails = await Video.find({});
        var item_id = videoDetails[0].videoYtID;
        // console.log("video item" + item);
        async.parallel({
            likes: (callback) => {
                videoLike.findOne({ videoID: item_id }, callback);

            },
           comments:(callback)=>{
               videoComment.findOne({ videoID: item_id }, callback);
           }
        },(err,result)=>{
            if(result){
                res.json({ videoDetails:videoDetails, videoLikes: result.likes,videoComment:result.comments});
              //  console.log(result);
            }
        })
    }
    catch (error) {
       // console.log(error);
        res.json({ error: 'error' })
    }
})

router.get('/videoById/:id',(req, res) =>{
    var id = req.params.id;
    //console.log(id);
    try{
        async.parallel({
            videoDetails:(callback) =>{
                Video.findOne({videoYtID : id},callback);
               // console.log(videoDetails);
       },
            likes:(callback) =>{
                videoLike.findOne({videoID:id},callback);
            },
            comments:(callback) =>{
                videoComment.findOne({videoID:id},callback);
            }
        },(err,result)=>{
         //   console.log(result.comments);
           res.json({videoDetails:result.videoDetails, videoLikes: result.likes,videoComment:result.comments})
        })        
    }catch (error) {
        // console.log(error);
         res.json({ error: 'error' })
     }
})

router.post('/like', (req, res) => {
    //console.log("from client params" + JSON.stringify(req.params));
    var vid = req.body.vid;
    var likescount = req.body.like;
    var islike = req.body.islike;

    //console.log("udi" + req.body.uid)
    user.findOne({ email_id: req.body.uid }, function (err, data) {
        if (err) {
            console.log("something went wrong" + err);
        } else {          
            videoLike.create({
                videoID: vid,
                userID: data._id,
                likes: islike,
                createdDate: Date.now(),
                ModifiedDate: Date.now()
            }).then(videoLike => {

                Video.findOneAndUpdate({
                    videoYtID: videoLike.videoID
                },
                    {
                        $set: { likes: parseInt(likescount) }
                    }).then(Video => {
                        res.json({ 'video': Video, 'videolike': videoLike });
                    })
        
            })
        }
    });
});


router.post('/savevideocomment', (req, res) => {
    user.findOne({ email_id: req.body.uid }, function (err, data) {
        if (err) {
            console.log("something went wrong" + err);
        } else {

            videoComment.find({ videoID: req.body.vid, userID: data._id }, function (err, commentdata) {
                // console.log(commentdata);
                if (commentdata.length === 0) {
                    console.log("inside new object")
                    videoComment.create({
                        videoID: req.body.vid,
                        userID: data._id,
                        comments: req.body.comment,
                        createdDate: Date.now(),
                        ModifiedDate: Date.now()
                    }).then(videoComment => {
                        res.json({ 'videoComment': videoComment })
                        console.log("Video comment saved :" + videoComment);
                    })
                } else {

                    //  console.log("comments "+ JSON.stringify(videocomment))
                    videoComment.update({ videoID: req.body.vid, userID: data._id },
                        { comments: req.body.comment, ModifiedDate: Date.now() }, function (err, videoComment) {
                            //console.log("comments " + (commentdata))
                            //res.json({'videoComment': JSON.stringify(videoComment) })
                        }).find({}, function (err, videoComent) {
                            // console.log("videoComment " + videoComent);
                            res.json({ "videoComment": videoComent, "username": data.name });
                        })

                }

            })

        }
    });
});

router.post('/dislike', (req, res) => {
    // console.log("from client params" + JSON.stringify(req.params));
    var vid = req.body.vid;
    var disLikescount = req.body.disLike;
    var islike = req.body.islike;

    console.log("udi" + req.body.uid)
    user.findOne({ email_id: req.body.uid }, function (err, data) {
        if (err) {
            console.log("something went wrong");
        } else {
            // console.log("user" + data);
            // userId = data._id;
            videoLike.create({
                videoID: vid,
                userID: data._id,
                likes: islike,
                createdDate: Date.now(),
                ModifiedDate: Date.now()
            }).then(videoLike => {

                Video.findOneAndUpdate({
                    videoYtID: videoLike.videoID
                },
                    {
                        $set: { disLikes: (disLikescount) }
                    }).then(video => {
                        res.json({ 'video': video, 'videolike': videoLike });
                    })
                console.log("Video updated :" + video);
                console.log("Video dis Like saved :" + videoLike);
            })

        }
    });

});

router.put('/updatevideo/:id', function (req, res) {
    //  console.log('Inside Update Category API');
    Video.findOneAndUpdate({
        _id: req.params.id
    },
        {
            $set: {likes: req.body.likes,disLikes: req.body.disLikes}
        }).then(video => {
            res.json({ 'video': video });
        })
})

router.post('/getvideoLikeByname', function (req, res) {
    // console.log("id in server"+ req.params.name);
    user.findOne({email_id: req.body.uid }, function (err, userdata) {
        if (err) {
            console.log("something went wrong");
        } else {
            videoLike.find({userID:userdata._id, videoID: req.body.vid}, function (err, data) {
                res.json({'videoLike': data })
                //console.log("VideoLike"+JSON.stringify(data));
            })
        }
    })
})

router.get('/getCommentsById/:id', function (req, res) {
    videoComment.findOne({ videoID: req.params.id }, function (err, data) {
        if (err) {
            console.log("something went wrong");
        } else {
            res.json({ 'videoComment': data })
        }
    })
})




















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































module.exports = router;
