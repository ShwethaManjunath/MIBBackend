var mongoose = require('mongoose');
var videoCommentSchema = mongoose.Schema({
    videoID:String,
    userID:String,
    comments:String,
    createdDate:Date,
    ModifiedDate:Date
})
var videoComment  = module.exports = mongoose.model('videoComment', videoCommentSchema);