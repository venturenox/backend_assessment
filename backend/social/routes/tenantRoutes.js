const express = require('express');
const router = express.Router();
const knex = require('./../database');


//get all records
router.get('/', async (req, res) => {
	const tenants = await knex.select().from('tenant_profile');

	res.status(200).json({ tenants: tenants });
});

//get a specific records
router.get('/:id', async (req, res) => {
	let tenant = await knex('tenant_profile').where('tenant_id', req.params.id).first();
	tenant = tenant ?? { message: 'No record found' };

	res.status(200).json(tenant);
});

//add a record
router.post('/', async (req, res) => {
	let payload = req.body;
	let addtenant = await knex('tenant_profile').insert(req.body);

	res.status(200).json({ "message": `Inserted ${addtenant.rowCount} record(s)` });
});

//delete a specific record
router.delete('/:id', async (req, res) => {
	let tenantDelete = await knex('tenant_profile')
		.returning('tenant_id')
		.where('tenant_id', req.params.id)
		.del();

	let json = { 
		"message": tenantDelete.length !== 0 ?  
			`deleted ${tenantDelete.length} record(s)` : 
			"record not found" 
		};

	res.status(200).json(json);
});

//update a specfic record
router.patch('/:id', async (req, res) => {
	let payload = req.body;
	let updatetenant = await knex('tenant_profile').where('tenant_id', req.params.id).update(payload);

	let json = { 
		"message": updatetenant !== 0 ? 
			`Updated ${updatetenant} records` : 
			"Update Failed/record not found" 
	};

	res.status(200).json(json);
});


module.exports = router;