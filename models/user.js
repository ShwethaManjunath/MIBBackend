var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// user schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email_id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    isPrime: {
        type: Boolean
    },
    account_id: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    modified_date: {
        type: Date
    },
    created_date: {
        type: Date
    }
});

var User = module.exports = mongoose.model('Users', UserSchema);

module.exports.saveUser = function (newUser, callback) {
    //console.log("inside User Model"+newUser);

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            //  console.log("password hash"+hash);
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
            console.log("New user is created" + newUser)
        });
    });
}

var  hashPassword  =  function (password) {
    return  bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports.getUserByUserName = function (username, callback) {
    var query = { email_id: username };
    User.findOne(query, callback);
}




module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}























