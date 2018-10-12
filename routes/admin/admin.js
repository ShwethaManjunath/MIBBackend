var express = require('express');
var router = express.Router();
var redis = require('../../config/redis');
var Category = require('../../models/admin/category');
var Product = require('../../models/admin/product');


// Saving Category
router.post('/saveCategory', function (req, res) {
    console.log('Inside save Category');
    var categoryName = req.body.category_name;
    var newCategory = new Category({
        category_name: categoryName
    })

    Category.saveCategory(newCategory, function (err, data) {
        if (err) throw err;
        res.json({ 'categories': data });
        //  console.log("Response from Category model" + data);
    })
})

//Get All Categories
router.get('/categories', function (req, res) {
    //console.log('Inside get Category');
    Category.find({}).then(item => {
        if(!item){
            res.status(404).json('data is not available');
        }
        res.status(200).json({ 'categories': item });
    })
})

//Get Category by Id
router.get('/category/:id', function (req, res) {
    console.log('Inside get Category by id');
    Category.findById(req.params.id,function (err, category) {
        if(err) return res.status(500).send(err);
        res.json({ 'category': category });
    })
})

//update Category
router.put('/updateCategory/:id', function (req, res) {
    //  console.log('Inside Update Category API');
    Category.findByIdAndUpdate({ _id: req.params.id }, {
        category_name: req.body.category_name
    }).then(category => {
        res.json({ 'category': category });
    })

})

// Delete a category
router.delete('/deleteCategory/:id', function (req, res) {
    console.log('Inside delete Category');
    Category.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Category is deleted successfully",
            id: Category._id
        };
        return res.status(200).send(response);
    });
})

//save Product
router.post('/saveProduct', function (req, res) {
    console.log('Inside save Product');
    if(req.account.user_type === 'admin'){
        Product.create({
            product_name: req.body.name,
            category_id: req.body.category_id,
            quantity: req.body.quantity,
            description: req.body.desc,
            image: req.body.image,
            price: req.body.price
        }).then(product => {
            res.json({ 'Products': product });
        });
    }else{
        res.status(403).send('you are not authorised');
    }
  
});

//Get All products using Redis
router.get('/products', (req, res) => {
    redis.exists('products', (err, response) => {
        if (response == 1) {
            console.log('exists');
            redis.get('products', function (err, data) {
                if (data) {
                    res.status(200).json({ 'products': JSON.parse(data), 'source': 'redis' });
                }
                //res.status(404).json({'msg':'does not exists'})
                console.log(data);
            });
        } else {
           // console.log('does not exists');
            Product.find()
                .populate('category_id')
                .exec(function (err, products) {
                    redis.set('products', JSON.stringify(products));
                    res.json({ 'products': products, 'source': 'database' });
                });
        }
    });
});


//Get Product by Id
router.get('/product/:id', function (req, res) {
    console.log('Inside get product by id');
    Product.findById(req.params.id,function (err, product) {
        res.status(200).json({ 'product': product });
    })
})

// router.get('/productsdb', function (req, res) {
//     console.log('Inside get product by id');
//     Product.find({}).then(item => {
//         res.json({ 'products': item });
//     })
// })

//update Product
router.put('/updateProduct/:id', function (req, res) {
    //  console.log('Inside Update Category API');
    Product.findOneAndUpdate({ _id: req.params.id }, {
        product_name: req.body.product_name,
        category_id: req.body.category_id,
        quantity: req.body.quantity,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    }).then(product => {
        res.status(200).json(product);
    })

})

// Delete a Product
router.delete('/deleteProduct/:id', function (req, res) {
    console.log('Inside delete Product');
    Product.findByIdAndRemove({ _id: req.params.id }, {
        product_name: req.body.product_name,
        category_id: req.body.category_id,
        quantity: req.body.quantity,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    }).then(product => {
        res.json({ 'product': product });
    })
})

// Filter the products by category
router.post('/filter', (req, res) => {
    let categories = req.body.category_id;
    Products.find({ category_id: { $in: categories } }).populate('category_id').exec((err, products) => {
        res.status(200).json({ 'products': products });
    })
});

module.exports = router;