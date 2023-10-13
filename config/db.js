const Knex = require("knex");
const knexConfig = require('../knexfile');

const knex = Knex(knexConfig.development);

module.exports = knex;  //we'll use this valriable in our libraries or codes
