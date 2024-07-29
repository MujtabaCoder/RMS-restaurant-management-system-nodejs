const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    item: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Veg', 'Non-Veg' ]
    },
    subCategory: {
        type: String,
        required: true,
        enum: ['Starter', 'Main Course','Beverage', 'Soup', 'Salad','Roti','Rice', 'Dessert','Juice', 'Snack', 'Side Dish']
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    // code: {
    //     type: Number,
    //     unique: true
    // }
});

module.exports = mongoose.model("Menu", menuSchema);
