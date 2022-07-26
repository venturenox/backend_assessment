
exports.up = async function(knex) {
	return await knex.schema.createTable('user_profile', (t) => {
		t.increments('id').primary();
		t.string('first_name').notNullable();
		t.string('last_name').notNullable();
		t.string('department').notNullable();
		t.string('designation').notNullable();
		t.integer('tenant_id').unsigned().notNullable();
		t.foreign('tenant_id')
			.references('id')
			.inTable('tenant_profile')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		t.string('image_url');
		t.string('city').notNullable();
		t.string('country').notNullable();
		t.string('bio');
		t.json('social_links');
		t.string('employee_id');
	});
};

exports.down = async function(knex) {
	return await knex.schema.dropTable('user_profile');
};
