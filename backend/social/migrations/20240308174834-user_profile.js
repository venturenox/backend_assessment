'use strict';

const { USER_PROFILE_TABLE_NAME } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(USER_PROFILE_TABLE_NAME, {
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
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable(USER_PROFILE_TABLE_NAME);
	},
};
