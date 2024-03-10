const router = require('express').Router();
const {
	createUser,
	getAllUsers,
	getUserProfileById,
	deleteUserProfileById,
	updateUserProfileById,
} = require('../controllers/userProfileController');
const { USER_PROFILE_ROUTE_PREFIX } = require('../utils/constants');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserProfileById);
router.delete('/:userId', deleteUserProfileById);
router.patch('/:userId', updateUserProfileById);

module.exports = { router, prefix: USER_PROFILE_ROUTE_PREFIX };
