var mongoose = require('mongoose');

var CartSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'user is must']
    },
    products:  [
        {
            product_id:  {
                type:  mongoose.Schema.Types.ObjectId,
                ref:  'Products'
            },
            quantity:  Number
        }],

})
var Cart = module.exports = mongoose.model('Cart', CartSchema);