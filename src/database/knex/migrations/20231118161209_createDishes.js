exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");

  table.text("name").notNullable();
  table.text("category").notNullable();
  table.decimal("price", 2);
  table.text("description");

  table.text("image");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
