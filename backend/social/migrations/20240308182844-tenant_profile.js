'use strict';

const {
	TENANT_PROFILE_TABLE_NAME,
	USER_PROFILE_TABLE_NAME,
} = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TENANT_PROFILE_TABLE_NAME, {
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
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable(TENANT_PROFILE_TABLE_NAME);
	},
};
