const { TenantController } = require('../module/tenant/tenant.controller');
const { UserController } = require('../module/user/user.controller');

const noAuthRoutes = [
	{
		path: '/tenant',
		action: new TenantController().routes()
	},
	{
		path: '/user',
		action: new UserController().routes()
	},
];

module.exports = {
	noAuthRoutes
};