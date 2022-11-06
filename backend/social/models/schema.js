const Knex = require('knex')
const connection = require('../knexfile')["development"]
const { Model } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class User extends Model {
  static get tableName () {
    return 'user_Profile'
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tenant,
        join: {
          from: 'user_Profile.tenant_id',
          to: 'tenant_Profile.id'
        }
      }
    }
  }
}

class Tenant extends Model {
  static get tableName () {
    return 'tenant_Profile'
  }

  static get relationMappings () {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'tenant_Profile.id',
          to: 'user_Profile.tenant_id'
        }
      }
    }
  }
}

module.exports = { User, Tenant }