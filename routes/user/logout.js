var express = require('express');
var router = express.Router();

router.get('/logout',function(req,res,next){
    req.logout();
    res.clearCookie("access_token");
    res.status(200).json({message:"logged out successfully"});
});

module.exports = router