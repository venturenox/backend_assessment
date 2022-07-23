require('dotenv').config('');
const express = require('express');
const { noAuthRoutes } = require('./routes/routes');
// const { initConsumer } = require('./utilities/consumer');
const { initProducer } = require('./utilities/producer');
const {Model} = require('objection');
// const { connectConsumer } = require('./utilities/consumer');
// const { connectProducer, connectAdmin } = require('./utilities/producer');
// const KeyMaster = require('./utilities/KeyMaster');
const { knexConnection } = require('./database/databaseConfig');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

Model.knex(knexConnection['dev']);


noAuthRoutes.forEach((route) => {
	app.use(`${route.path}`, route.action);
});

app.use((error, req, res, next ) => {
	const status = error.status || 500;
	const message = error.message || 'internal server error';
	res.status(status).send(message);
	next();
});

app.listen(process.env.PORT || 4000, async () => {
	
	console.log('App started at port', process.env.PORT || 4000);
	await initProducer();

});