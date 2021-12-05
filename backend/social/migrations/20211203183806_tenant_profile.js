exports.up = function (knex) {
  return knex.schema.createTable("TenantProfile", function (table) {
    table.increments("tenant_id")
    table.string("tenant_name").notNullable()
    table.json("address")
    table.string("city")
    table.string("state")
    table.string("country")
    table.string("zip_code")
    table.string("phone")
    table.string("web_url")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("TenantProfile")
}
