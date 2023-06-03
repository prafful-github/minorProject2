const mongoose = require('mongoose');

const FoodItems = mongoose.Schema([
    {
        CategoryName:String,
        name:String,
        img:String,
        options:Array,
        description:String
    }
]);

module.exports = mongoose.model('fooditems', FoodItems);