const { Model } = require("objection")
const knexfile = require("../knexfile")
const Knex = require("knex")

exports.initializeDB = () => {
  const knex = Knex(knexfile.development)
  Model.knex(knex)
}
