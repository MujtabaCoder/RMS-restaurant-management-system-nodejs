// controllers/expenseController.js

const Expense = require('../models/Expense');

exports. addExpensePage = (req,res)=>{
    
    res.render('createexpense')

}

exports.addExpense = async (req, res) => {
    try {
        const { category, expenseDate, amount, invoiceNumber, vendor, description } = req.body;
        const restaurantId = req.restaurant.restaurantId;
        const newExpense = new Expense({
            restaurantId: restaurantId, // assuming you have middleware that sets req.restaurantId
            expenseType: category, // mapped from the form
            expenseDate,
            amount,
            description,
            paymentMethod: req.body.paymentMethod || 'other', // if paymentMethod is not included in the form
            invoiceNumber,
            vendor,
            category, // optionally map category to expense category if needed
            receiptURL: req.body.receiptURL || '', // if you handle receipts
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getExpense = async(req,res)=>{
    try {
        const restaurantId = req.restaurant.restaurantId;

        const expenses = await Expense.find({restaurantId }).populate('restaurantId');
        res.render('expense-list', { expenses });
    } catch (err) {
        res.status(500).send('Server Error');
    }

}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.send('Expense deleted');
    } catch (err) {
        res.status(500).send('Server Error');
    }
}