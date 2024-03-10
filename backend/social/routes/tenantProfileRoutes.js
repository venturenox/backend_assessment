const router = require('express').Router();
const {
	createTenantProfile,
	getAllTenantProfiles,
	getTenantProfileById,
	deleteTenantProfileById,
	updateTenantProfileById,
} = require('../controllers/tenantProfileController');
const { TENANT_PROFILE_ROUTE_PREFIX } = require('../utils/constants');

router.post('/', createTenantProfile);
router.get('/', getAllTenantProfiles);
router.get('/:tenantId', getTenantProfileById);
router.delete('/:tenantId', deleteTenantProfileById);
router.patch('/:tenantId', updateTenantProfileById);

module.exports = { router, prefix: TENANT_PROFILE_ROUTE_PREFIX };
