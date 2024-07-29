// imports
const mongoose = require("mongoose");


const restBranchSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    Parent_Rest: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("restBranchSchema", restBranchSchema);