var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var bodyParser = require('body-parser');
var User = require('../../models/user');
var Account = require('../../models/account');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'hellonode';

var urlEncoder = bodyParser.urlencoded({ extended: false });

router.use(passport.initialize());

//For strategy
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload recieved:' + jwt_payload);
    // make a call to user authentication using db.. 

    User.getUser(req.body.email_id, function (err, data) {
        User.findById(jwt_payload._id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
});

passport.use(strategy);

router.post('/', urlEncoder, function (req, res, next) {
    console.log("Inside login")
    if (req.body.username && req.body.password) {
        var name = req.body.username;
        var password = req.body.password;
    }
    Account.getUserByUserName(req.body.username, function (err, user) {
        if (!user) {
            res.json({ error: "No such user found" });
        } else {
            Account.comparePassword(req.body.password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log('Password is matched');
                    var payload = { id: user._id };
                    var token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '1h' });
                    res.json({ message: "ok", token: token });
                } else {
                    console.log('Password is Mis Matched');
                    res.json({ error: "password did not match" });
                }
            });

        }
    })
})


module.exports = router







