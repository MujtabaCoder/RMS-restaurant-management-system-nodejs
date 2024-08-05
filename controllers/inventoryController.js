const InventoryItem = require('../models/InventoryItem');
const Supplier = require('../models/Supplier')


exports.addInventory = async (req,res)=>{
    try {
        const suppliers = await Supplier.find(); // Fetch all suppliers
        res.render('add-inventory', { suppliers }); // Pass suppliers to EJS template
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.addItem = async (req, res) => {
    try {
      const restaurantId = req.restaurant.restaurantId;
      
      // Create a new item with the restaurantId included in the body
      const newItem = new InventoryItem({
        ...req.body,
        restaurantId: restaurantId
      });
      
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  exports.getItem = async (req, res) => {
    try {
      const restaurantId = req.restaurant.restaurantId;

        const inventoryItems = await InventoryItem.find({ restaurantId })
            .populate('supplier', 'name'); // Optionally populate the supplier field

        res.render('inventory-list',{inventoryItems});
    } catch (error) {
        console.error('Error fetching restaurant and inventory items:', error);
        res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteInventory = async (req, res) => {
    try {
        await InventoryItem.findByIdAndDelete(req.params.id);
        res.send('Inventory deleted');
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

  

  