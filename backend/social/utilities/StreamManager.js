const crudService = require("../services/CrudService")
const UserProfile = require("../models/UserProfile")
const TenantProfile = require("../models/TenantProfile")

const processMessage = async (kafkaMessage) => {
  //Start working here

  if (kafkaMessage.event_name == "tenant_created") {
    data = { ...kafkaMessage.properties, tenant_id: kafkaMessage.properties.id, tenant_name: kafkaMessage.properties.name, address: { address: kafkaMessage.properties.address } }
    delete data.name
    delete data.id

    const response = await crudService.store(TenantProfile, data)
    if (response.statusCode == 400) {
      console.log(response.error)
    }
  } else if (kafkaMessage.event_name == "user_created") {
    data = { ...kafkaMessage.properties, user_id: kafkaMessage.properties.id }
    delete data.id

    const response = await crudService.store(UserProfile, data)
    if (response.statusCode == 400) {
      console.log(response.error)
    }
  }
  console.log(kafkaMessage)
}

module.exports = { processMessage }
