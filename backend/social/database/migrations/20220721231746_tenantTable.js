exports.up = async function (knex) {
	return await knex.schema.createTable('tenant_profile', (t) => {
		t.increments('id').primary();
		t.string('tenant_name').notNullable();
		t.json('address').notNullable();
		t.string('city').notNullable();
		t.string('state');
		t.string('country').notNullable();
		t.string('zip_code');
		t.string('phone').notNullable();
		t.string('web_url');
	});
};

exports.down = async function(knex) {
	return await knex.schema.dropTable('tenant_profile');
};
