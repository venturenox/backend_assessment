exports.up = function (knex) {
  return knex.schema.createTable("UserProfile", function (table) {
    table.integer("user_id").notNullable().primary()
    table.string("first_name").notNullable()
    table.string("last_name").notNullable()
    table.string("department")
    table.string("designation")
    table.string("image_url")
    table.string("city")
    table.string("country")
    table.string("bio")
    table.json("social_links")
    table.integer("employee_id")
    table.integer("tenant_id").references("tenant_id").inTable("TenantProfile").onDelete("CASCADE").onUpdate("CASCADE")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("UserProfile")
}
