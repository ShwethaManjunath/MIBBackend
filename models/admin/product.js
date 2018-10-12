var mongoose = require('mongoose');

// user schema
var ProductSchema = mongoose.Schema({
    category_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        required : [true, 'Catergory is must']    
    },
    product_name : {
        type:String,
        unique : true,
        required : [true, 'Product name is must']
    },
    quantity : {
        type:Number,
        required : [true, 'Product quantity is must']
    },
    description : {
        type:String
    },
    image : {
        type : String,
        required : [true, 'Product image is must']
    },
    price : {
        type : Number,
        required : [true, 'Product price is must']
    },
    flag : {
        type : Boolean,
        default : true
    }
})

var Product = module.exports = mongoose.model('Products',ProductSchema);
