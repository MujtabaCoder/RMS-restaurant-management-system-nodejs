const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController')
const {requireAuth} = require('../middleware/authMiddleware')
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')
const reportController = require('../controllers/reportController')
const datereportController =require('../controllers/datereportController')

router.get('/',(req,res)=>{
    res.render('signup')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.get('/index',requireAuth,restaurantController.getIndex)


router.post('/api/signup', restaurantController.SignUp );
router.post('/api/signin',restaurantController.SignIn)
router.post('/api/log-out',restaurantController.LogOut)

// All menu relate routes are here
router.get('/addmenupage',(req,res)=>{
    res.render('add-item')
})

router.get('/pos',requireAuth,menuController.GetPos)
router.get('/getmenu',requireAuth,menuController.GetMenu)
router.post('/api/addmenu',requireAuth,menuController.AddMenu)
router.post ('/api/placeorder',requireAuth,orderController.PlaceOrder)

// All report releted  routes 

router.get('/chart-js',(req,res)=>{

    res.render('chart-js')

})

router.get('/api/reports/sales',reportController.sales)
router.get('/api/reports/orders',reportController.orders)

// All report releted  routes 

router.get('/datechart',(req,res)=>{

    res.render('datechart')

})

router.get('/api/reports/sales-by-date',datereportController.salesByDate)
router.get('/api/reports/orders-by-date',datereportController.ordersByDate)



module.exports = router;