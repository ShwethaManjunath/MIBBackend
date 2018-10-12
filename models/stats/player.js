var mongoose = require('mongoose');

var PlayerSchema = mongoose.Schema({
    player_name : {
        type:String,
    },
    profile_details:{
        type:String
    },
    image :{
        type:String
    },
    player_type:{
        type:String
    },
    created_date:{
        type:Date
    },
    modified_date:{
        type:Date
    },
    api_id:{
        type:String,
        unique:true,
        required:true
    },
    player_flag:{
        type:Boolean
    }
})

var Player = module.exports = mongoose.model('player',PlayerSchema);