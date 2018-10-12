var mongoose = require('mongoose');
var VideoSchema = mongoose.Schema({
    videoDescription:String,
    thumbnails:String,
    videoURL:String,
    videoYtID:{ type:  String, required:  true, unique:  true  },
    videoDuration:String,
    videoTitle:String,
    likes:Number,
    disLikes:Number,
    createdDate:Date,  
})

var videoDetailsSchema = module.exports = mongoose.model('videoDetails', VideoSchema);  