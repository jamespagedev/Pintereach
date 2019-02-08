/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const showdown = require('showdown');
const { errorHandler } = require('../middleware/errorHandler.js');

const server = express();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
// Make README.md the home page
const md = fs.readFileSync('../README.md', 'utf8');
const converter = new showdown.Converter({ tables: true });
const text = md;
converter.makeHtml(text);

server.use(helmet()); // hides your tech stack from sniffers
server.use(express.json()); // built-in
server.use(morgan('short')); // logging middleware
server.use(cors()); // allows domains/ports to connect to your server
app.use(express.static('public')); // creates the html file in /public/docs.html

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../public/docs.html'));
});

const authRouter = require('./routes/authRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const categoriesRouter = require('./routes/categoriesRouter.js');

server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use('/categories', categoriesRouter);

server.use(errorHandler); // This line needs to be after all routes

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = server;
