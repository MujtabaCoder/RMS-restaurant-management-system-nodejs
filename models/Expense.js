// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  expenseType: {
    type: String,
    required: true
  },
  expenseDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit card', 'bank transfer', 'other'],
    required: true
  },
  invoiceNumber: {
    type: String,
    unique: true
  },
  vendor: {
    type: String,
  },
  category: {
    type: String,
  },
  receiptURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
