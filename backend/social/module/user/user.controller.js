const { Router } = require('express');
const { UserService } = require('./user.service');
const { verifyUserSchemaMiddleware, verifyUserPatchSchemaMiddleware } = require('./user.middleware');

class UserController {
	constructor() {
		this.router = Router();
		this.userService = new UserService();
		this.routes();
	}

  addUser = async (req, res) => {
  	try{
  		const user = await this.userService.addUser(req.body);
  		return res.status(200).send(user);
  	}catch(error){
  		return res.status(500).send(error.message);
  	}
  }

  getAllUsers = async (req, res) => {
  	try {
  		const allUsers = await this.userService.getAllUsers();
  		if (!!allUsers) {
  			return res.status(200).send(allUsers);
  		}else{
  			return res.status(500).send({
  				error: true,
  				message: 'tenants didn\'t found'
  			});
  		}
  	} catch (error) {
  		return res.status(500).send({
  			error: true,
  			message: error.message
  		});
  	}
  }

  getUser = async (req, res) => {
  	const { id } = req.params;
  	try {
  		const user = await this.userService.getUser(Number(id));
  		if (!!user){
  			return res.status(200).send(user);
  		}else{
  			return res.status(500).send({
  				error: true,
  				message: 'tenant with given id not found'
  			});
  		}
  	} catch (error) {
  		return res.status(500).send({
  			error: true,
  			message: error.message
  		});
  	}
  }

  removeUser = async (req, res) => {
  	const { id } = req.params;
  	try {
  		const removedUser = await this.userService.removeUser(Number(id));
  		if (removedUser){
  			return res.status(200).send({
  				message: `user removed by id ${id}`
  			});
  		}else{
  			return res.status(500).send({
  				error: true,
  				message: 'user already removed or user not found'
  			});
  		}
  	} catch (error) {
  		return res.status(500).send({
  			error: true,
  			message: error.message
  		});
  	}
  }

  updateUser = async (req, res) => {
  	const { id } = req.params;
  	try{
  		const user = await this.userService.updateUser(id, req.body);
  		return res.status(200).send(user);
  	}catch(error){
  		return res.status(500).send({
  			error: true,
  			message: error.message
  		});
  	}
  }

  routes() {
  	this.router.post('/', verifyUserSchemaMiddleware ,this.addUser);
  	this.router.get('/', this.getAllUsers);
  	this.router.get('/:id', this.getUser);
  	this.router.delete('/:id', this.removeUser);
  	this.router.patch('/:id', verifyUserPatchSchemaMiddleware ,this.updateUser);
  	return this.router;
  }
}

module.exports = {
	UserController
};