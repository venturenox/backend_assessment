const { Model } = require('objection');

class User extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'user_profile';
	}

	static relationMappings() {
		return {
			tenantProfile: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('../tenant/tenant.model').Tenant,
				join: {
					from: 'user_profile.tenant_id',
					to: 'tenant_profile.id',
				}
			},
		};
	}
}
module.exports = {
	User
};