const userRoute = require('express').Router();

var chat = require('../../models/chat/chatDetailsSchema')
const chaterBoxDatabase = require('../../models/chat/chatDetailsSchema');


//To get chat questions
/* URL : /chat/getqueans */
userRoute.get("/getqueans", (req, res) => {
    chaterBoxDatabase.chaterBox.find({}, (err, result) => {
        if (err)
        { res.status(500).json({ 'error': 'Internal Server Error!!!' }); }
        else {
            //logger.info(result);
            res.status(200).json({ data: result });
        }
    });
});

//To insert chat questions
/* URL : /chat/insqueans */
userRoute.get("/insqueans", (req, res) => {

    var chaterBox = new chaterBoxDatabase.chaterBox;
    chaterBox.question = "how to purchase Products?";
    chaterBox.answer = ["Please login the web application and click on merchandise", "After Login and select the product and select add to cart"];
    chaterBox.hits = 0;
    chaterBox.save();

    var chaterBox1 = new chaterBoxDatabase.chaterBox;
    chaterBox1.question = "when will i get my product?"
    chaterBox1.answer = ["It will be delivered within 7 days after purchase", "it will be delivered soon"];
    chaterBox1.hits = 0;
    chaterBox1.save();
});

module.exports = userRoute;
