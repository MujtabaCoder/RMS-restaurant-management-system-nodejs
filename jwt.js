require('dotenv').config();
const jwt = require('jsonwebtoken');

// const BlacklistedToken = require('./models/BlacklistedToken');

const generateToken = (payload) => {
    return jwt.sign(payload, 'muj7021', { expiresIn: '1h' });
};

const verifyToken = async (token) => {
    try {
       
        // const blacklisted = await BlacklistedToken.findOne({ token });
        // if (blacklisted) {
            
        //     return null;
        // }

        
        const decoded = jwt.verify(token, 'muj7021');
        return decoded;
    } catch (error) {
        return null;
    }
};


module.exports = { generateToken, verifyToken };
