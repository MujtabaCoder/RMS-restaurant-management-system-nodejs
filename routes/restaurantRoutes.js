const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController')
const {requireAuth} = require('../middleware/authMiddleware')
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')
const reportController = require('../controllers/reportController')
const datereportController =require('../controllers/datereportController')
const inventoryController = require('../controllers/inventoryController');
const expenseController = require('../controllers/expenseController')
const supplierController = require('../controllers/supplierController');
const dashboardController = require('../controllers/dashController');
const customerController = require('../controllers/customerController')





router.get('/',(req,res)=>{
    res.render('signup')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.get('/index',requireAuth,dashboardController.Dashboard)


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


//inventroy coontroller routes 
router.get('/addinventory',inventoryController.addInventory)

router.post('/api/addinventory',requireAuth, inventoryController.addItem);
router.get('/get-expense-list',requireAuth,inventoryController.getItem)
router.delete('/deleteinventory/:id',inventoryController.deleteInventory );



// suppliers related routes 


router.post('/api/create',requireAuth, supplierController.createSupplier);
router.get('/api/getsuppliers',requireAuth, supplierController.getSuppliers);
router.get('/api/getsuppliersbyid/:id' ,requireAuth, supplierController.getSupplierById);
router.put('/api/updatesuppliers/:id' ,requireAuth, supplierController.updateSupplier);
router.delete('/api/deletesuppliers/:id' ,requireAuth, supplierController.deleteSupplier);


//all expense related rouets are here 

router.get('/addexpense',expenseController.addExpensePage)


router.post('/api/addexpense',requireAuth,expenseController.addExpense)
router.get('/getexpense',requireAuth, expenseController.getExpense);
router.delete('/deleteexpense/:id', expenseController.deleteExpense);



// all cutomer related routes 

router.post('/customers/create',requireAuth,customerController.createCustomers)


module.exports = router;