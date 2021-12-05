const { Model } = require("objection")
const TenantProfile = require("./TenantProfile")

class UserProfile extends Model {
  //Setting table Name
  static get tableName() {
    return "UserProfile"
  }
  static get idColumn() {
    return "user_id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name", "tenant_id"],
      properties: {
        user_id: { type: "integer" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        department: { type: "string" },
        designation: { type: "string" },
        image_url: { type: "string" },
        city: { type: "string" },
        country: { type: "string" },
        bio: { type: "string" },
        employee_id: { type: "integer" },
        tenant_id: { type: "integer" },
      },
    }
  }

  //Setting Relation with tenant_profile
  static get relationMappings() {
    return {
      tenant: {
        relation: Model.BelongsToOneRelation,
        modelClass: TenantProfile,
        join: {
          from: "UserProfile.tenant_id",
          to: "TenantProfile.tenant_id",
        },
      },
    }
  }
}

module.exports = UserProfile
