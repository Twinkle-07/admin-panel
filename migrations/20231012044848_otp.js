const knex = require("../config/db")


exports.up = function(knex) {
    return knex.schema
    .createTable('otp', function (table) {
        table.increments('id');
        table.string('email', 255).notNullable();
        table.integer('otp').notNullable();
    })
};


exports.down = function(knex) {
    return knex.schema
    .dropTable("otp");
};
