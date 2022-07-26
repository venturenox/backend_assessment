const { Model } = require('objection');

class Tenant extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'tenant_profile';
	}

	static relationMappings() {
		return {
			userProfile: {
				relation: Model.HasManyRelation,
				modelClass: require('../user/user.model').User,
				join: {
					from: 'tenant_profile.id',
					to: 'user_profile.tenant_id',
				},
			},
		};
	}
}

module.exports = {
	Tenant
};