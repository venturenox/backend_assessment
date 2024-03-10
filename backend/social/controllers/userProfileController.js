const { UserProfile } = require('../models/userProfile');
const { TenantProfile } = require('../models/tenantProfile');

const createUser = async (req, res) => {
	try {
		const {
			user_id,
			first_name,
			last_name,
			department,
			designation,
			tenant_id,
			image_url,
			city,
			country,
			bio,
			social_links,
			employee_id,
		} = req.body;

		if (!first_name || !tenant_id) {
			return res.status(400).json({
				message: 'First Name or Tenant ID is missing!',
				data: null,
			});
		}

		const userProfileData = {
			first_name,
			last_name,
			department,
			designation,
			image_url,
			city,
			country,
			bio,
			social_links,
			employee_id,
		};

		if (user_id) {
			const userExist = await UserProfile.findAll({ where: { user_id } });
			if (userExist.length > 0) {
				return res.status(400).json({
					message: 'User ID already exists!',
					data: null,
				});
			}
			userProfileData.user_id = user_id;
		}

		if (tenant_id) {
			const tenantExist = await UserProfile.findAll({
				where: { tenant_id },
			});
			if (tenantExist.length > 0) {
				return res.status(400).json({
					message: 'Tenant ID already exists!',
					data: null,
				});
			}
			userProfileData.tenant_id = tenant_id;
		}

		const createdUserProfile = await UserProfile.create(userProfileData);

		return res.status(201).json({
			message: 'User Profile created successfully!',
			data: createdUserProfile,
			error: null,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Something went wrong!',
			data: null,
			error,
		});
	}
};

const getAllUsers = async (req, res) => {
	try {
		const userProfiles = await UserProfile.findAll();

		return res.status(200).json({
			message: 'User profiles retrieved successfully!',
			data: userProfiles,
			error: null,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Something went wrong!',
			data: null,
			error,
		});
	}
};

const getUserProfileById = async (req, res) => {
	const userId = req.params.userId;

	try {
		const userProfile = await UserProfile.findOne({
			where: { user_id: userId },
			include: [
				{
					model: TenantProfile,
					attributes: [
						'tenant_id',
						'tenant_name',
						'address',
						'city',
						'state',
						'country',
						'zip_code',
						'phone',
						'web_url',
					],
				},
			],
		});

		if (!userProfile) {
			return res.status(404).json({
				message: 'User profile not found!',
				data: null,
				error: null,
			});
		}

		return res.status(200).json({
			message: 'User profile retrieved successfully!',
			data: userProfile,
			error: null,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Something went wrong!',
			data: null,
			error,
		});
	}
};

const deleteUserProfileById = async (req, res) => {
	const userId = req.params.userId;

	try {
		const deletedUserProfileCount = await UserProfile.destroy({
			where: { user_id: userId },
		});

		if (deletedUserProfileCount === 0) {
			return res.status(404).json({
				message: 'User profile not found!',
				data: null,
				error: null,
			});
		}

		return res.status(200).json({
			message: 'User profile deleted successfully!',
			data: null,
			error: null,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Something went wrong!',
			data: null,
			error,
		});
	}
};

const updateUserProfileById = async (req, res) => {
	const userId = req.params.userId;
	const updatedFields = req.body;

	try {
		const [updatedCount] = await UserProfile.update(updatedFields, {
			where: { user_id: userId },
		});

		if (updatedCount === 0) {
			return res.status(404).json({
				message: 'User profile not found!',
				data: null,
				error: null,
			});
		}

		return res.status(200).json({
			message: 'User profile updated successfully!',
			data: null,
			error: null,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Something went wrong!',
			data: null,
			error,
		});
	}
};

module.exports = {
	createUser,
	getAllUsers,
	getUserProfileById,
	deleteUserProfileById,
	updateUserProfileById,
};
