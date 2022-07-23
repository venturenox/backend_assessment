const { Router } = require('express');
const { TenantSchema, TenantPatchSchema } = require('./tenant.schema');
const { TenantService } = require('./tenant.service');

class TenantController {
	constructor() {
		this.router = Router();
		this.tenantService = new TenantService();
		this.routes();
	}

  addTenant = async (req, res) => {
  	if (TenantSchema.safeParse(req.body)){
  		try{
  			const tenant = await this.tenantService.addTenant(req.body);
  			res.status(200).send(tenant);
  		}catch(error){
  			res.status(500).send(error.message);
  		}
  	}else{
  		res.status(400).send({
  			error: true,
  			message: 'field not set properly'
  		});
  	}
  }

  getAllTenants = async (req, res) => {
  	try {
  		const allTenant = await this.tenantService.getAllTenants();
  		if (!!allTenant) {
  			res.status(200).send(allTenant);
  		}else{
  			res.status(500).send({
  				error: true,
  				message: 'tenants didn\'t found'
  			});
  		}
  	} catch (error) {
  		res.status(500).send({
  			error: true,
  			message: error.message
  		});
  	}
  }

  getTenant = async (req, res) => {
  	const { id } = req.params;
  	try {
  		const tenant = await this.tenantService.getTenant(Number(id));
  		if (!!tenant){
  			res.status(200).send(tenant);
  		}else{
  			res.status(500).send({
  				error: true,
  				message: 'tenant with given id not found'
  			});
  		}
  	} catch (error) {
  		res.status(500).send({
  			error: true,
  			message: error.message
  		});
  	}
  }

  removeTenant = async (req, res) => {
  	const { id } = req.params;
  	try {
  		const removedTenant = await this.tenantService.removeTenant(Number(id));
  		if (removedTenant){
  			return res.status(200).send({
  				message: `tenant with id ${id} removed`
  			});
  		}else{
  			return res.status(500).send({
  				message: 'tenant did not removed or already removed'
  			});
  		}
  	} catch (error) {
  		return res.status(500).send({
  			error: true,
  			message: error.message
  		});
  	}
  }

  updateTenant = async (req, res) => {
  	const { id } = req.params;
  	if (TenantPatchSchema.safeParse(req.body)){
  		try{
  			const tenant = await this.tenantService.updateTenant(id, req.body);
  			res.status(200).send(tenant);
  		}catch(error){
  			res.status(500).send({
  				error: true,
  				message: error.message
  			});
  		}
  	}else{
  		res.status(400).send({
  			error: true,
  			message: 'field not set properly'
  		});
  	}
  }

  routes() {
  	this.router.post('/', this.addTenant);
  	this.router.get('/', this.getAllTenants);
  	this.router.get('/:id', this.getTenant);
  	this.router.delete('/:id', this.removeTenant);
  	this.router.patch('/:id', this.updateTenant);
  	return this.router;
  }
}

module.exports = {
	TenantController
};