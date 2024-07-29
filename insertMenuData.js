const mongoose = require('mongoose');
const Menu = require('./models/menu');

mongoose.connect('mongodb+srv://mujtabacooder:Go808t5JIzvImP02@mujtabacooder.rt0buyi.mongodb.net/RMS?retryWrites=true&w=majority&appName=mujtabacooder', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
})

const menuData = [
    {
        "_id": "66a230d4002222ab1522a08a",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Chole Bhature",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 180,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a08b",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Mutton Rogan Josh",
        "category": "Non-Veg",
        "subCategory": "Main Course",
        "price": 400,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a08c",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Aloo Gobi",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 150,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a08d",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Fish Tikka",
        "category": "Non-Veg",
        "subCategory": "Starter",
        "price": 250,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a08e",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Paneer Lababdar",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 240,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a08f",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Chicken Korma",
        "category": "Non-Veg",
        "subCategory": "Main Course",
        "price": 350,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a090",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Dal Makhani",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 200,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a091",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Kebab Platter",
        "category": "Non-Veg",
        "subCategory": "Starter",
        "price": 320,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a092",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Rajma",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 170,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a093",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Prawn Curry",
        "category": "Non-Veg",
        "subCategory": "Main Course",
        "price": 350,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a094",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Palak Paneer",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 230,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a095",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Beef Stroganoff",
        "category": "Non-Veg",
        "subCategory": "Main Course",
        "price": 380,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a096",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Pulao",
        "category": "Veg",
        "subCategory": "Rice",
        "price": 180,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a097",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Tandoori Chicken",
        "category": "Non-Veg",
        "subCategory": "Starter",
        "price": 300,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a098",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Veg Pakora",
        "category": "Veg",
        "subCategory": "Starter",
        "price": 140,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a099",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Gulab Jamun",
        "category": "Veg",
        "subCategory": "Dessert",
        "price": 90,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a09a",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Kachori",
        "category": "Veg",
        "subCategory": "Starter",
        "price": 120,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a09b",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Shrimp Scampi",
        "category": "Non-Veg",
        "subCategory": "Starter",
        "price": 340,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a09c",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Dal Tadka",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 190,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a09d",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Lamb Kebab",
        "category": "Non-Veg",
        "subCategory": "Starter",
        "price": 360,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a09e",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Chana Masala",
        "category": "Veg",
        "subCategory": "Main Course",
        "price": 160,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a09f",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Chicken Caesar Salad",
        "category": "Non-Veg",
        "subCategory": "Salad",
        "price": 250,
        "availability": true
      },
      {
        "_id": "66a230d4002222ab1522a0a0",
        "restaurantId": "66a230d4002222ab1522a088",
        "item": "Palak Chaat",
        "category": "Veg",
        "subCategory": "Starter",
        "price": 150,
        "availability": true
      },
    
]

Menu.insertMany(menuData)
    .then(docs => {
        console.log('Data inserted:', docs);
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error inserting data:', err);
        mongoose.connection.close();
    });
   
