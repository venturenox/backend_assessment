const express = require('express');
const router = express.Router();
const knex = require('./../database');

//get all records
router.get('/', async (req, res) => {
	const users = await knex.select().from('user_profile');

	res.status(200).json({ users: users });
});

//get a specific records
router.get('/:id', async (req, res) => {
	let user = await knex('user_profile').where('user_id', req.params.id).first();
	user = user ?? { message: 'No record found' };

	res.status(200).json(user);
});

//add a record
router.post('/', async (req, res) => {
	let payload = req.body;
	let addUser = await knex('user_profile').insert(req.body);

	res.status(200).json({ "message": `Inserted ${addUser.rowCount} record(s)` });
});

//delete a specific record
router.delete('/:id', async (req, res) => {
	let userDelete = await knex('user_profile')
		.returning('user_id')
		.where('user_id', req.params.id)
		.del();

	let json = userDelete.length !== 0 ? { "deleted_id": userDelete[0] } : { "message": "record not found" };

	res.status(200).json(json);
});

//update a specfic record
router.patch('/:id', async (req, res) => {
	let payload = req.body;
	let updateUser = await knex('user_profile').where('user_id', req.params.id).update(payload);

	let json = { "message": updateUser !== 0 ? `Updated ${updateUser} records` : "Update Failed/record not found" };

	res.status(200).json(json);
});


module.exports = router;