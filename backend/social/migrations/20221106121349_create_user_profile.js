exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('user_Profile', table => {
            table.increments('id');
            table.string('first_name');
            table.string('last_name');
            table.string('department');
            table.integer('tenant_id').references('tenant_Profile.id');;
            table.string('designation');
            table.string('image_url');
            table.string('city');
            table.string('country');
            table.string('bio');
            table.json('social_links');
            table.integer('employee_id');
        })
    ]) 
};

exports.down = function(knex,) {
    return Promise.all([
        knex.schema.dropTable('user_Profile')
      ])
  
};