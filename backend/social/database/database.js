const { Sequelize } = require('sequelize');
const usersDBConnection = new Sequelize('social', 'postgres', 'postgres', {
	host: 'postgres',
	dialect: 'postgres',
	logging: console.log,
});

usersDBConnection
	.authenticate()
	.then(() => {
		console.log('Database connected!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = { usersDBConnection };
