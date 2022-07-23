const { TenantRepository } = require('./tenant.repository');

class TenantService {

	constructor() {
		this.tenantRepository = new TenantRepository();
	}

  addTenant = async (tenantData) => {
  	return await this.tenantRepository.addTenant(tenantData);
  };

  getAllTenants = async () => {
  	return await this.tenantRepository.getAllTenants();
  };

  getTenant = async (id) => {
  	return await this.tenantRepository.getTenant(id);
  };

  removeTenant = async (id) => {
  	try {
  		const tenant = await this.getTenant(id);
  		if (tenant){
  			return await this.tenantRepository.removeTenant(id);
  		}
  	} catch (error) {
  		return undefined;
  	}
  }

  updateTenant = async (id, newTenantData) => {
  	return await this.tenantRepository.updateTenant(id, newTenantData);
  }
}

module.exports = {
	TenantService   
};
