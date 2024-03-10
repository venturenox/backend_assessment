const Sequelize = require('sequelize');
const { usersDBConnection } = require('../database/database');
const {
	TENANT_PROFILE_TABLE_NAME,
	USER_PROFILE_TABLE_NAME,
} = require('../utils/constants');

const tenantProfileSchema = {
	tenant_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		references: {
			model: USER_PROFILE_TABLE_NAME,
			key: 'tenant_id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	tenant_name: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	address: {
		type: Sequelize.JSON,
		allowNull: true,
	},
	city: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	state: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	country: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	zip_code: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	phone: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	web_url: {
		type: Sequelize.STRING,
		allowNull: true,
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

const TenantProfile = usersDBConnection.define(
	TENANT_PROFILE_TABLE_NAME,
	tenantProfileSchema,
	{
		underscored: true,
		timestamps: false,
		paranoid: true,
		freezeTableName: true,
		tableName: TENANT_PROFILE_TABLE_NAME,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
	}
);

module.exports = { TenantProfile };
