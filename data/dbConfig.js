const knex = require('knex');
const config = require('../knexfile.js');

const environment = process.env.DATABASE_URL || 'development';

module.exports = knex(config[environment]);
