var mongoose = require('mongoose');

// CategorySchema
var CategorySchema = mongoose.Schema({
    category_name : {
        type:String,
        unique:true
    },
})

var Category = module.exports = mongoose.model('category',CategorySchema);

module.exports.saveCategory = function(newCategory,callback){
    console.log("Data to save " + newCategory)
     newCategory.save(callback);
     console.log("New category is created"+ newCategory)
}

