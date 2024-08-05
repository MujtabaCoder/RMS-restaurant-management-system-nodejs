const Order = require('../models/order')
const Menu = require('../models/menu')
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;
const InventoryItem = require('../models/InventoryItem');
const mongoose = require('mongoose');

async function printOrder(order, type) {
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,  // 'EPSON' or 'STAR'
    interface: 'printer connection string',
  });

  printer.alignCenter();
  printer.bold(true);
  printer.println(type === 'bill' ? 'BILL' : 'KOT');
  printer.bold(false);
  printer.alignLeft();

  order.items.forEach(item => {
    printer.println(`${item.name} x ${item.quantity} - $${item.price}`);
  });

  if (type === 'bill') {
    printer.println('-----------------------------');
    printer.println(`Total: $${order.totalAmount}`);
  }

  try {
    await printer.execute();
    console.log('Print successful');
  } catch (error) {
    console.error('Print failed:', error);
  }
}
const PlaceOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
      const restaurantId = req.restaurant.restaurantId;
      const { items, orderType, comment } = req.body;

      // Prepare order items with menu item details
      const orderItems = await Promise.all(items.map(async item => {
          const menuItem = await Menu.findById(item.menuItem);
          return {
              menuItem: menuItem._id,
              quantity: item.quantity,
              price: menuItem.price * item.quantity
          };
      }));

      // Calculate subtotal, tax, and total amount
      const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
      const tax = subtotal * 0.1; // Assuming a tax rate of 10%
      const totalAmount = subtotal + tax;

      // Create new order
      const newOrder = new Order({
          restaurantId,
          items: orderItems,
          totalAmount,
          taxAmount: tax,
          orderType,
          comment
      });

      await newOrder.save({ session });

      // Update inventory based on order items
      // for (const item of orderItems) {
      //     const inventoryItem = await InventoryItem.findOne({ menuItem: item.menuItem }).session(session);
      //     if (inventoryItem) {
      //         inventoryItem.quantity -= item.quantity;
      //         await inventoryItem.save({ session });
      //     } else {
      //         throw new Error(`Inventory item for menu item ${item.menuItem} not found`);
      //     }
      // }

      // Print KOT and Bill
      await printOrder(newOrder, 'KOT');
      await printOrder(newOrder, 'bill');

      await session.commitTransaction();
      session.endSession();

      res.status(201).send(newOrder);
  } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).send(error.message);
  }
};




module.exports={ PlaceOrder}