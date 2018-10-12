var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var expressValidator = require('express-validator');

var User = require('../../models/user');
var Account = require('../../models/account');


var transporte = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'men.in.blue.team.manager@gmail.com',
        pass: 'admin@MiB'
    }
})

var mailOptions = {
    from: 'men.in.blue.team.manager@gmail.com',
    to: '',
    subject: 'welcome to MiB Fan Club',
    html: '<h2>Welcome Fan </h2><p> thank you for registering with us</p><br> <p>please visit our website regularly to keep you updated </p><br><br> <p>warm Regards</p><br><p>Team MiB</p>'
}

//express validator
router.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));



router.post('/', function (req, res) {
    // console.log("Inside register")
    var name = req.body.name;
    var username = req.body.email_id;
    var email_id = req.body.email_id;
    //var isPrime =req.body.isPrime;
    var password = req.body.password;
    //var confirm = req.body.confirm;
    var address = (req.body.address);
    var oauth_source = null;
    var oauth_id = null;
    var user_type = 'user';
    var modified_date = Date.now();
    var created_date = Date.now();

    var phone = req.body.phone;
    req.checkBody('name', 'Name should not be empty').notEmpty();
    //req.checkBody('username','User Name should not be empty').notEmpty();
    req.checkBody('phone', 'phone should not be empty').notEmpty();
    // req.checkBody('phone','phone should be 10 digits').isMobilePhone();
    req.checkBody('email_id', 'Email should not be empty').notEmpty();
    req.checkBody('email_id', 'Account is already existing with this id').exists();
    req.checkBody('email_id', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password should not be empty').notEmpty();
    req.check("password", "one digit and min 8 , max 20 char long").isLength({ min: 5 });
    //req.checkBody('confirm','Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    //console.log(errors);

    if (errors) {
        res.json({ errors: errors });
    } else {
        var newAccount = new Account({
            username: username,
            email_id: email_id,
            oauth_source: oauth_source,
            oauth_id: oauth_id,
            user_type: user_type,
            // prime_user : isPrime,
            password: password,
            modified_date: modified_date,
            created_date: created_date
        })
        Account.saveAccount(newAccount, function (err, data) {
            if (err) throw err;
            //Creating User Profile
            var newUser = new User({
                name: name,
                email_id: email_id,
                username: email_id,
                phone: phone,
                // isPrime : isPrime,
                password: password,
                address: address,
                phone: phone,
                account_id: data._id,
                modified_date: modified_date,
                created_date: created_date
            });

            User.saveUser(newUser, function (err,
                data) {
                if (err) throw err;
                //  console.log("Response from user model" + data);
            });
            mailOptions.to = email_id;
            transporte.sendMail(mailOptions, function (error, res) {
                if (error) {
                    console.log('some error comes', error);
                } else {
                    console.log('mail sent succesfully', res.info);
                }
            });
        });
        res.json({ message: 'you have registered successfully you can login now' });
    }

});

module.exports = router;





