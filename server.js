require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');



//connect to mongoDB
connectDB();

//use the logging middleware here
app.use(logger);

//middleware to handle post data
app.use(express.urlencoded({ extended: true }))

//middle to handle json()
app.use(express.json());

// middleware to enable cookies
app.use(cookieParser());

// set template engine
app.set('view engine', 'ejs');

//middleware to enable serving static files
app.use('/', express.static(path.join(__dirname, 'public')));

//router
app.use('/', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/verify', require('./routes/verifyLinkRouter'));
app.use('/home', require('./routes/profile'));

//middleware to log errors that get to this point
app.use(errorHandler);


mongoose.connection.once('open', () => {
    console.log("Database connection successful");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})
