const { UserSchema, UserPatchSchema } = require('./user.schema');

const verifyUserSchemaMiddleware = (req, res, next) => {
	try {
		UserSchema.parse(req.body);
		next();
	} catch (error) {
		res.status(404).send('schema error');
	}
};

const verifyUserPatchSchemaMiddleware = (req, res, next) => {
	try {
		UserPatchSchema.parse(req.body);
		next();
	} catch (error) {
		res.status(404).send('field not set properly');
	}
};

module.exports = {
	verifyUserSchemaMiddleware,
	verifyUserPatchSchemaMiddleware
};