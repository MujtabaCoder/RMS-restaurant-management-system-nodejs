const jwtUtils = require('../jwt');
const restaurant = require('../models/restaurant');

const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    try {
        const decoded = await jwtUtils.verifyToken(token); 
        if (!decoded) {
            res.redirect('/signin');
        } else {
            // Extract user ID from the decoded token
            req.restaurant = { restaurantId: decoded.restaurantId };

            next();
        }
    } catch (error) {
        console.error(error);
        res.status(401).send('Token is blacklisted');
    }
};

module.exports = { requireAuth };
