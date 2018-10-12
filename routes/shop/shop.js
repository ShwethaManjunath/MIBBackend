var express = require('express');
var router = express.Router();
var Cart = require('../../models/shop/cart');
let User = require('../../models/user');
let Order = require('../../models/shop/order');

router.post('/addToCart', (req, res) => {
    console.log("Inside Add to cart")
    let product_id = req.body.pid;
    let user_id = req.body.uid;
    let quantity = req.body.quantity;

    User.findOne({ email_id: user_id }, function (err, data) {
        if (err) {
            res.status(500).json({ 'error': 'Internal Server Error!!!' }); 
            //console.log("something went wrong" + err);
        } else {
            //  console.log("user " + data._id);
            Cart.find({ user_id: data._id, 'products.product_id': product_id }, (err, cartData) => {
                if (cartData.length != 0) {
                    res.json({ 'msg': 'already exists' });
                    console.log("exist");
                } else {
                    let product = { "product_id": product_id, "quantity": quantity };
                    let insert = { "user_id": data._id, "products": product };
                    Cart(insert).save((err, cart) => {
                        if (err) res.send(err);
                        res.json({ 'cart': cart });
                        //  console.log("added "+cart);
                        // console.log(cart);
                    });
                }
            });

        }
    })
})

router.post('/cartDetailsByuser', (req, res) => {
    //console.log('Inside get cart details')
    User.findOne({ 'email_id': req.body.uid }, function (err, data) {
        if (err) {
            console.log("something went wrong");
        } else {
            Cart.find({ 'user_id': data._id })
                .populate('products.product_id')
                .exec(function (err, products) {
                    if (err) res.send(err);
                    let sum = 0;
                    //  console.log("products" + products)
                    for (i = 0; i < products.length; i++) {
                        sum += products[i].products[0].product_id['price'];
                    }

                    if (products.length != 0) {
                        //console.log(products);
                        res.json({ 'cart': products, 'sum': sum });
                        console.log("Products: " + products);
                    } else {
                        res.json({ 'message': 'No products in the cart' });
                    }
                });
        }
    })

})
//To delete products from cart

router.post('/delete', (req,  res)  =>  {

    //var token = req.headers.authentication;
    // var returnedToken = jwt.verifyToken(token);

    Cart.remove({ user_id: req.body.userID, 'products.product_id': req.body.product_id }, (err, data) => {
        if  (err) {
            res.json({  'message': err });
        }  else  {
            res.json({  'success':  'deleted successfully',  'data': data });
        }

    });
});
router.post('/placeOrder', (req, res)  =>  {

    let  user_id  =  req.body.userID;

    Cart.find({ user_id: user_id })
        .populate('products.product_id') // column which has objectId relation with referred table
        .exec(function  (err,  products) {

            let  sum  =  0;
            for (i  =  0; i < products.length; i++) {
                sum  +=  products[i].products[0].product_id['price'];
            }
            let  products_from_cart  =  [];
            for (i  =  0; i < products.length; i++) {
                products_from_cart.push(products[i].products[0].product_id['_id']);
            }
            let  prod  =  { 'product_id': products_from_cart, 'quantity': 1 };

            let  order  =  { 'products':  prod, 'total': sum, 'user_id': user_id, 'order_status': 'Processed' };
            Order(order).save((err, data)  =>  {
                res.json({ 'success': true, 'message': 'Order placed' });
            });

            Cart.remove({ user_id: user_id }, (err, data)  =>  {
                if  (err) {
                    throw  err;
                }
            });
        });
});
module.exports = router;

