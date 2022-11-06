
exports.up = function(knex) {
    return Promise.all([
    knex.schema.createTable('tenant_Profile', table => {
        table.string('web_url');
        table.string('name');
        table.string('address');
        table.string('city');
        table.string('state');
        table.string('country');
        table.string('zip_code');
        table.string('phone');
        table.increments('id')
    })
])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('tenant_Profile')
      ])
};
