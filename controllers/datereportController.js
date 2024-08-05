const Order = require('../models/order')
const Menu = require('../models/menu')


const salesByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        // console.log(startDate, endDate);

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
            // console.log(`Order ID: ${order._id}, Total Amount: ${order.totalAmount}`);
            order.items.forEach(item => {
                const menuItem = item.menuItem;
                if (!menuItem) {
                    console.log(`Item not found for order ${order._id}`);
                    return;
                }

                const category = menuItem.category;
                const subCategory = menuItem.subCategory;
                const price = menuItem.price;
                const quantity = item.quantity;
                const itemSales = price * quantity;

                totalSales += itemSales;

                salesByCategory[category] = (salesByCategory[category] || 0) + itemSales;
                salesBySubCategory[subCategory] = (salesBySubCategory[subCategory] || 0) + itemSales;

                // console.log(`Item: ${menuItem.name}, Category: ${category}, Sub-Category: ${subCategory}, Price: ${price}, Quantity: ${quantity}, Sales: ${itemSales}`);
            });
        });

        // console.log({
        //     totalSales,
        //     salesByCategory,
        //     salesBySubCategory,
        //     numberOfTransactions: orders.length
        // });
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
        // console.log(startDate, endDate);
        

        // Convert query parameters to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set the end time to the end of the day

        const orders = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        }).populate('items.menuItem');

        let totalOrders = orders.length;
        let itemCounts = {};
        let totalAmount = 0;
        let orderTypeCounts = {
            'dine in': 0,
            'take away': 0,
            'online': 0
        };

        let salesOverTime = {};
        let orderVolumeByHour = new Array(24).fill(0);
        let revenueByOrderType = {
            dineIn: 0,
            takeAway: 0,
            online: 0
        };

        orders.forEach(order => {
            const orderDate = order.createdAt.toDateString();
            const orderHour = order.createdAt.getHours();
            orderVolumeByHour[orderHour]++;
            salesOverTime[orderDate] = (salesOverTime[orderDate] || 0) + order.totalAmount;

            if (order.orderType === 'dine in') {
                revenueByOrderType.dineIn += order.totalAmount;
            } else if (order.orderType === 'take away') {
                revenueByOrderType.takeAway += order.totalAmount;
            } else if (order.orderType === 'online') {
                revenueByOrderType.online += order.totalAmount;
            }

            orderTypeCounts[order.orderType] = (orderTypeCounts[order.orderType] || 0) + 1;
            order.items.forEach(item => {
                const itemName = item.menuItem.item;
                itemCounts[itemName] = (itemCounts[itemName] || 0) + item.quantity;
            });
            totalAmount += order.totalAmount;
        });

        const mostPopularItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);

        // console.log({
        //     totalOrders,
        //     mostPopularItems,
        //     averageOrderValue: totalOrders > 0 ? totalAmount / totalOrders : 0,
        //     orderTypeCounts,
        //     salesOverTime,
        //     orderVolumeByHour,
        //     revenueByOrderType
        // });

        res.json({
            totalOrders,
            mostPopularItems,
            averageOrderValue: totalOrders > 0 ? totalAmount / totalOrders : 0,
            orderTypeCounts,
            salesOverTime,
            orderVolumeByHour,
            revenueByOrderType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    salesByDate,
    ordersByDate
};
