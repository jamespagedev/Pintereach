/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const { errorHandler } = require('../middleware/errorHandler.js');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
server.use(helmet()); // hides your tech stack from sniffers
server.use(express.json()); // built-in
server.use(morgan('short')); // logging middleware
server.use(cors()); // allows domains/ports to connect to your server

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
server.get('/', (req, res) => {
  res.send(`Main Server Running...`);
});

const authRouter = require('./routes/authRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const categoriesRouter = require('./routes/categoriesRouter.js');

server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use('/categories', categoriesRouter);

server.use(errorHandler);

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = server;
