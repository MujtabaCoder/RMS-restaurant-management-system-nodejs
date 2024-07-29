const Order = require('../models/order')
const Menu = require('../models/menu')

const sales = async (req, res) => {
    try {
        // Get the start and end of the current day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find orders created within the current day
        const orders = await Order.find({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).populate('items.menuItem');

        let totalSales = 0;
        let salesByCategory = {};
        let salesBySubCategory = {};

        orders.forEach(order => {
            totalSales += order.totalAmount;
            order.items.forEach(item => {
                const category = item.menuItem.category;
                const subCategory = item.menuItem.subCategory;

                salesByCategory[category] = (salesByCategory[category] || 0) + (item.price * item.quantity);
                salesBySubCategory[subCategory] = (salesBySubCategory[subCategory] || 0) + (item.price * item.quantity);
            });
        });

        res.json({
            totalSales,
            salesByCategory,
            salesBySubCategory,
            numberOfTransactions: orders.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const orders = async (req, res) => {
    try {
        // Get the start and end of the current day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find orders created within the current day
        const orders = await Order.find({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).populate('items.menuItem');

        let totalOrders = orders.length;
        let itemCounts = {};
        let totalAmount = 0;

        orders.forEach(order => {
            order.items.forEach(item => {
                const itemName = item.menuItem.item;
                itemCounts[itemName] = (itemCounts[itemName] || 0) + item.quantity;
            });
            totalAmount += order.totalAmount;
        });

        const mostPopularItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);

        res.json({
            totalOrders,
            mostPopularItems,
            averageOrderValue: totalOrders > 0 ? totalAmount / totalOrders : 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
 sales,orders
}