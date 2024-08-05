
const Customer = require('../models/Customer')

exports.createCustomers = async function(req,res){

    // console.log(req.body);
    

    try {
        const restaurantId = req.restaurant.restaurantId;
        const { name, phone, address } = req.body;
        const newCustomer = new Customer({ name, phone, address, restaurantId });
        await newCustomer.save();
        res.status(201).json(newCustomer);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}