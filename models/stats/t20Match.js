var mongoose = require('mongoose');

var T20MatchSchema = mongoose.Schema({
    player_id : {
        type:String,
        unique:true,
        required:true
    },
    no_matches:{
        type:Number
    },
    runs_scored :{
        type:Number
    },
    average:{
        type:Number
    },
    no_100:{
        type:Number
    },
    no_50:{
        type:Number
    },
    no_wickets:{
        type:Number
    },
    top_score:{
        type:Number
    },
    created_date:{
        type:Date
    },
    economy:{
        type:Number
    }
})
var T20Match = module.exports = mongoose.model('t20',T20MatchSchema);