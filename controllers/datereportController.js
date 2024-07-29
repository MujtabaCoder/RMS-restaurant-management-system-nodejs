const Order = require('../models/order')
const Menu = require('../models/menu')


const salesByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Convert query parameters to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set the end time to the end of the day

        // Find orders created within the specified date range
        const orders = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end
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

const ordersByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Convert query parameters to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set the end time to the end of the day

        // Find orders created within the specified date range
        const orders = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end
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
    salesByDate,
    ordersByDate
};
