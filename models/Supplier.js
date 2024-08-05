// models/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
  name: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
