
exports.up = function(knex) {
	return knex.schema.createTable('tenant_profile', function (table) {
	  table.increments('tenant_id');
	  table.string('tenant_name');	//varchar 255 by default
	  table.json('address');
	  table.string('city');
	  table.string('state');
	  table.string('country');
	  table.string('zip_code');
	  table.string('phone');
	  table.string('web_url');
	});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tenant_profile');
};
