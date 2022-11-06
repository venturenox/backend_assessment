
exports.up = function(knex) {
  return knex.schema.createTable('user_profile', function (table) {
	  table.increments('user_id');
	  table.string('first_name');	//varchar 255 by default
	  table.string('last_name');
	  table.string('department');
	  table.string('designation');
	  table.integer('tenant_id').unsigned().references('tenant_id').inTable('tenant_profile').onDelete('CASCADE');
	  table.string('image_url');
	  table.string('city');
	  table.string('country');
	  table.string('bio');
	  table.json('social_links');
	  table.integer('employee_id');
	});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_profile');
};
