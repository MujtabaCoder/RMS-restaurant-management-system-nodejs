const Order = require('../models/order')
const Menu = require('../models/menu')
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

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

const PlaceOrder = async (req,res)=>{
    try {
        const restaurantId = req.restaurant.restaurantId; 

        const {items } = req.body;
        // console.log(restaurantId,items);
    
        const orderItems = await Promise.all(items.map(async item => { 
            const menuItem = await Menu.findById(item.menuItem); 
            return { menuItem: menuItem._id, quantity: item.quantity, price: menuItem.price * item.quantity }; 
          })); 
          const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0); 
          const tax = subtotal * 0.1; // Assuming a tax rate of 10%
          const totalAmount = subtotal + tax; 
      
          const newOrder = new Order({ 
            restaurantId, 
            items: orderItems, 
            totalAmount, 
            taxAmount: tax // Add tax amount to the order schema
          });
      
          await newOrder.save(); 
      
          // Print KOT
          await printOrder(newOrder, 'KOT'); 
      
          // Print Bill
          await printOrder(newOrder, 'bill'); 
      
          res.status(201).send(newOrder); 
        } catch (error) { 
          res.status(400).send(error); 
        } 
}


module.exports={ PlaceOrder}