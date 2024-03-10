const Sequelize = require('sequelize');
const { usersDBConnection } = require('../database/database');
const { USER_PROFILE_TABLE_NAME } = require('../utils/constants');
const { TenantProfile } = require('./tenantProfile');

const userProfileSchema = {
	user_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		unique: true,
	},
	first_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	department: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	designation: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	tenant_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
	},
	image_url: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	city: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	country: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	bio: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	social_links: {
		type: Sequelize.JSON,
		allowNull: true,
	},
	employee_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	created_at: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	updated_at: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
};

const UserProfile = usersDBConnection.define(
	USER_PROFILE_TABLE_NAME,
	userProfileSchema,
	{
		underscored: true,
		timestamps: false,
		paranoid: true,
		freezeTableName: true,
		tableName: USER_PROFILE_TABLE_NAME,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
	}
);

UserProfile.hasMany(TenantProfile, {
	foreignKey: 'tenant_id',
	sourceKey: 'tenant_id',
});
TenantProfile.belongsTo(UserProfile, {
	foreignKey: 'tenant_id',
	targetKey: 'tenant_id',
});

module.exports = { UserProfile };
