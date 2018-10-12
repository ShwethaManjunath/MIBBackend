var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
    user_id: {
        type: String
    },
    products:  [
        {
            product_id:  {
                type:  mongoose.Schema.Types.ObjectId,
                ref:  'Products'
            }
        }],
    total_price: {
        type: Number
    },
    order_status: {
        type: String
    }
})

var Order = module.exports = mongoose.model('order', OrderSchema);