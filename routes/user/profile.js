var express = require('express');
var router = express.Router();
let User = require('../../models/user');
let Account = require('../../models/account');

router.post('/userProfile', (req, res) => {
    var userId = req.body.uid;
    User.findOne({ username: userId }, function (err, data) {
        if (data===undefined) res.status(404);
        else if(err) throw err;
        else{
            Account.findById(data.account_id, function (err, accountData) {
                if (err) throw err;
                res.json({ user: data, account: accountData });
                console.log({ user: data, account: accountData });
            })
        }
    })
})

router.post('/updateProfile', (req, res) => {
    console.log("Inside update profile")
    User.findOneAndUpdate({ email_id: req.body.uid }, {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        modified_date: Date.now()
    }).then(userData => {
        res.json({ user: userData });
        //  console.log({user:userData,account:accountData});
    })
})
module.exports = router;

