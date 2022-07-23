require('dotenv').config();

const { knexSnakeCaseMappers } = require('objection');

module.exports = {
	client: 'postgresql',
	connection: {
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		user: process.env.POSTGRES_USERNAME,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
	},
	migrations: {
		directory: __dirname + '/migrations',
	},
	...knexSnakeCaseMappers({
		underscoreBetweenUppercaseLetters: true,
	}),
};
