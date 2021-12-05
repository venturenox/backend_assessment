module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      // host: 'postgres',
      // port: '5432',
      // user: 'postgres',
      // password: 'postgres',
      // database: 'social'
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
}
