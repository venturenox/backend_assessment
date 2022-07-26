const { TenantSchema, TenantPatchSchema } = require('./tenant.schema');

const verifyTenantSchemaMiddleware = (req, res, next) => {
	try {
		TenantSchema.parse(req.body);
		next();
	} catch (error) {
		res.status(404).send('schema error');
	}
};

const verifyTenantPatchSchemaMiddleware = (req, res, next) => {
	try {
		TenantPatchSchema.parse(req.body);
		next();
	} catch (error) {
		res.status(404).send('field not set properly');
	}
};

module.exports = {
	verifyTenantSchemaMiddleware,
	verifyTenantPatchSchemaMiddleware
};