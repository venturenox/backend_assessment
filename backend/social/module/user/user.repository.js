const { User } = require('./user.model');

class UserRepository {
  addUser = async (userData) =>  {
  	return await User.query().insertAndFetch(userData);
  }

  getAllUsers = async () => {
  	return await User.query()
  		.withGraphJoined('tenantProfile');
  }

  getUser = async (id) => {
  	const user = await User.query().findOne({
  		id: id
  	});
  	return await user.$query()
  		.withGraphJoined('tenantProfile');
  }

  removeUser = async (id) => {
  	try {
  		return await User.query().deleteById(id);
  	} catch (error) {
  		return false;
  	}
  }

  updateUser = async (id, newUserData) => {
  	return await User.query().updateAndFetchById(id, {
  		...newUserData,
  	});
  }
}

module.exports = {
	UserRepository
};
