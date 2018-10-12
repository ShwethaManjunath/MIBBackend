var mongoose = require('mongoose');
var videoLikeSchema = mongoose.Schema({
    videoID:String,
    userID:String,
    likes:Boolean,
    createdDate:Date,
    ModifiedDate:Date
})
var videoLikeStatus  = module.exports = mongoose.model('videoLikeStatus', videoLikeSchema);