var mongoose = require('mongoose');

var OdiMatchSchema = mongoose.Schema({
    player_id : {
        type:String,
        unique:true
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
var OdiMatch = module.exports = mongoose.model('odi',OdiMatchSchema);