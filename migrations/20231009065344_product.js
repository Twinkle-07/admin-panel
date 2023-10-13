const knex = require("../config/db")


exports.up = function(knex) {
    return knex.schema
    .createTable('products', function (table) {
        table.increments('id');
        table.string('product', 255).notNullable();
        table.string('price', 255).notNullable();
        table.integer('quantity').notNullable();
        table.string('discount', 255).defaultTo(null).nullable()
    })
};


exports.down = function(knex) {
    return knex.schema
    .dropTable("products");
};
