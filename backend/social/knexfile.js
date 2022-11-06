// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config()
module.exports = {

  development: {
    client: 'pg',
    host: process.env.POSTGRES_HOST,
    connection: process.env.POSTGRES_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
