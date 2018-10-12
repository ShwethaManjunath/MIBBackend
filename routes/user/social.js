const router = require('express').Router();
const passport = require('passport');
var jwt = require('jsonwebtoken');

//Auth Login

router.get('/login',passport.authenticate('google',{
    scope: ['profile','email']
}))

router.get('/statergy/redirect',passport.authenticate('google'),(req,res) =>{
   // res.send('you reached the callback uri' + res.user)

        // console.log('User:'+req.user);
   var payload = { id: req.user.id };
   // console.log(payload);
  var token = jwt.sign(payload, 'mysecretkey', { expiresIn: '24h' });
           console.log("token : "+token);
           let conURL = "/x_Token/"+token+"/user/"+req.user.username+"/type/"+req.user.user_type;
           res.redirect("http://localhost:4200/index"+conURL);

})
module.exports = router;
