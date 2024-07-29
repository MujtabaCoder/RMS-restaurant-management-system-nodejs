const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwtUtils = require('../jwt');
const Menu = require('../models/menu')

const restaurantModel = require("../models/restaurant");
const { response } = require("express");

// const SECRET_KEY = process.env.SECRET_KEY;

exports.SignUp = async function (req, res) {
    const { email, ownerName, restaurantName, city, address, mobile, password } = req.body;
// console.log(email, ownerName, restaurantName, city, address, mobile, password);
    try {
        const existingRestaurant = await restaurantModel.findOne({ username: email });
        if (existingRestaurant) {
            return res.status(400).json({ success: false, message: 'Email is already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newRestaurant = new restaurantModel({
            username: email,
            ownerName: ownerName,
            restaurantName: restaurantName,
            city: city,
            address: address,
            mobile: mobile,
            password: hashedPassword
        });

        const restaurant = await newRestaurant.save();

        // const payload = { subject: restaurant._id };
        // const token = jwt.sign(payload, SECRET_KEY);

        // const token = jwtUtils.generateToken({restaurantId: restaurant._id  });

        // res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ success: true, message: 'Sign up successful!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
}

exports.SignIn = async function (req, res) {
    const { email, password } = req.body;

    try {
        const restaurant = await restaurantModel.findOne({ username: email });

        if (!restaurant) {
            return res.json({
                success: false,
                message: "Invalid username"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, restaurant.password);

        if (!isPasswordValid) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }


        const token = jwtUtils.generateToken({restaurantId: restaurant._id  });
        res.cookie('jwt', token, { httpOnly: true});

        return res.redirect('/index');
    } catch (err) {
        return res.json({
            success: false,
            message: "Authentication failed",
            error: err
        });
    }
}

exports.getRestaurant = async function (req, res) {
    try {
        const restaurantData = await restaurantModel.find({ isadmin: false }, {
            _id: 1,
            ownerName: 1,
            restaurantName: 1,
            username: 1,
            city: 1
        });

        return res.status(200).json({
            success: true,
            message: "Restaurant data fetched successfully",
            body: [restaurantData]
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Try again",
            error: err
        });
    }
}


exports.getIndex = async function (req,res){
    const restaurantId = req.restaurant.restaurantId; // Assuming `req.restaurant` is set by authentication middleware

    try {
        const menus = await Menu.find({ restaurantId });
        res.render('index', { menus }); // Render 'menu.ejs' and pass 'menus' to it
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

exports.LogOut = async (req,res)=>{
    try {
        const token = req.cookies.jwt;
    
        if (token) {
          res.clearCookie('jwt');
    
        //   const user = await User.findOne({ tokens: token });
        //   if (user) {
        //     user.tokens = user.tokens.filter(t => t !== token);
        //     await user.save();
        //   }
    
        //   const decodedToken = jwt.decode(token);
        //   const expiresAt = new Date(decodedToken.exp * 1000); // Convert to milliseconds
    
        //   const blacklistedToken = new BlacklistedToken({
        //     token,
        //     expiresAt
        //   });
        //   await blacklistedToken.save();
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }

}
