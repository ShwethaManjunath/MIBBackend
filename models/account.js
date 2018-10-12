var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// user schema
var AccountSchema = mongoose.Schema({
    username : {
        type : String,
        index : true,
        unique:true
    },
    password : {
        type:String
    },
    oauth_source : {
        type:String
    },
   oauth_id : {
        type:String
    },
    user_type  : {
        type:String
    },
    prime_user :{
        type:Boolean
    },
    modified_date:{
        type:Date
    },
    created_date :{
        type:Date
    }
   
    });
    
    var Account = module.exports = mongoose.model('account',AccountSchema);
    
    module.exports.saveAccount = function(newAccount,callback){
      //  console.log("inside User Model"+newAccount);
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newAccount.password , salt, function(err, hash) {
                console.log("password hash"+hash);
                // Store hash in your password DB.
                newAccount.password = hash;
                newAccount.save(callback);
               console.log("New account is created"+ newAccount)
            });
        });
    }

    module.exports.getUserByUserName = function (username, callback) {
        var query = {username: username };
        Account.findOne(query, callback);
    }
    
    
    
    
    module.exports.comparePassword = function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    }
    