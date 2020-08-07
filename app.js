const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

const indexRoute = require('./api/routes/index');
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./api/routes/products');
// import routes
// app
const app = express();
// instalize database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log('Database connection is Up'));

// middleware functions 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(expressValidator());
app.use(cors());

// home route
app.use('/', indexRoute);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api',productRoutes);
// routes 

const port = process.env.PORT ||  5000;
app.listen(port, ()=> {
    console.log(`Server is up and running on port ${port}`);
});