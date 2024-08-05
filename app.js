require('dotenv').config();
const  express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const connectDB = require('./db'); 
const session = require('express-session');
const restaurantRoutes = require('./routes/restaurantRoutes')
const port = process.env.PORT
const app = express()
connectDB();


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:  24 * 60 * 60 * 1000 }, 
}));

app.use((req,res,next)=>{
    res.set('Cache-Control','no-store, no-cache,must-revalidate,private')
   res.setHeader('Expires', '-1')
   res.setHeader('pragma','no-cache')
    next();
})





app.use(restaurantRoutes);


app.listen(port, () => console.log(`RMS app listening on port ${port}!`)) 