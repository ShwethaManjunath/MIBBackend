const passport = require('passport');
const googleStgy = require('passport-google-oauth20');
let account = require('../models/account');
let user = require('../models/user');
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    account.findById(id, (user) => {
        done(null, user);
    })
})

passport.use(
    new googleStgy({
        callbackURL: '/google/statergy/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        console.log("accessToken  :" + accessToken)
        console.log("refreshTxoken  :" + refreshToken)
        account.findOne({ "oauth_id": profile.id }, function (err, data) {
            if (data) {
                done(null, data)
            } else {
                accountData = { username: profile.emails[0].value, oauth_source: profile.provider, oauth_id: profile.id, created_date: Date.now(), modified_date: Date.now() }
                var newAccount = new account(accountData);
                newAccount.save((err, adata) => {
                    if (err) {
                        console.log('err :' + err)
                    } else {
                        var userDetails = { username: profile.displayName, account_id: adata._id, created_date: Date.now(), modified_date: Date.now() };
                        var newUser = new user(userDetails);
                        newUser.save((err, udata) => {
                            if (err) {
                                console.log('err :' + err)
                            } else {
                                console.log('data :' + udata)
                            }
                        })
                        done(null, adata)
                    }
                })
            }

        })
    })
)