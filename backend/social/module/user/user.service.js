const { UserRepository } = require('./user.repository');
const { TenantService } = require('../tenant/tenant.service');

class UserService {

	constructor() {
		this.userRepository = new UserRepository();
		this.tenantService = new TenantService();
	}

  addUser = async (userData) => {
  	return await this.userRepository.addUser(userData);
  };

  getAllUsers = async () => {
  	return await this.userRepository.getAllUsers();
  };

  getUser = async (id) => {
  	return await this.userRepository.getUser(id);
  };

  removeUser = async (id) => {
  	const user = await this.getUser(id);
  	if (user) {
  		return await this.userRepository.removeUser(id);
  	}else{
  		return undefined;
  	}
  }

  updateUser = async (id, newUserData) => {
  	const tenant = await this.tenantService.getTenant(newUserData.tenantId);
  	return tenant 
  		? await this.userRepository.updateUser(id, newUserData) 
  		: null;
  }
}

module.exports = {
	UserService   
};
