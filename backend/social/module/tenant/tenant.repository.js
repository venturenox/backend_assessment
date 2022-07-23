const { Tenant } = require('./tenant.model');

class TenantRepository {
  addTenant = async (tenantData) =>  {
  	return await Tenant.query().insertAndFetch(tenantData);
  }

  getAllTenants = async () => {
  	return await Tenant.query();
  }

  getTenant = async (id) => {
  	return await Tenant.query().findOne({
  		id: id
  	});
  }

  removeTenant = async (id) => {
  	try {
  		return await Tenant.query().deleteById(id);
  	} catch (error) {
  		return false;
  	}
  }

  updateTenant = async (id, newTenantData) => {
  	return await Tenant.query().updateAndFetchById(id, {
  		...newTenantData
  	});
  }
}

module.exports = {
	TenantRepository
};
