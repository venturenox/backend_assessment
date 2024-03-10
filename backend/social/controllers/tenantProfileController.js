const { TenantProfile } = require('../models/tenantProfile');

const createTenantProfile = async (req, res) => {
	try {
		const { tenant_id } = req.body;
		if (!tenant_id) {
			return res.status(400).json({
				message: 'Tenant ID is required!',
				data: null,
				error: null,
			});
		}

		const existingTenantProfile = await TenantProfile.findOne({
			where: { tenant_id },
		});
		if (existingTenantProfile) {
			return res.status(400).json({
				message:
					'Tenant profile with the provided tenant ID already exists!',
				data: null,
				error: null,
			});
		}

		const newTenantProfile = await TenantProfile.create(req.body);

		return res.status(201).json({
			message: 'Tenant profile created successfully!',
			data: newTenantProfile,
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

const getAllTenantProfiles = async (req, res) => {
	try {
		const tenantProfiles = await TenantProfile.findAll();

		return res.status(200).json({
			message: 'Tenant profiles retrieved successfully!',
			data: tenantProfiles,
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

const getTenantProfileById = async (req, res) => {
	const tenantId = req.params.tenantId;

	try {
		const tenantProfile = await TenantProfile.findByPk(tenantId);

		if (!tenantProfile) {
			return res.status(404).json({
				message: 'Tenant profile not found!',
				data: null,
				error: null,
			});
		}

		return res.status(200).json({
			message: 'Tenant profile retrieved successfully!',
			data: tenantProfile,
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

const deleteTenantProfileById = async (req, res) => {
	const tenantId = req.params.tenantId;

	try {
		const tenantProfile = await TenantProfile.findByPk(tenantId);

		if (!tenantProfile) {
			return res.status(404).json({
				message: 'Tenant profile not found!',
				data: null,
				error: null,
			});
		}

		await tenantProfile.destroy();

		return res.status(200).json({
			message: 'Tenant profile deleted successfully!',
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

const updateTenantProfileById = async (req, res) => {
	const tenantId = req.params.tenantId;
	const updates = req.body;

	try {
		let tenantProfile = await TenantProfile.findByPk(tenantId);

		if (!tenantProfile) {
			return res.status(404).json({
				message: 'Tenant profile not found!',
				data: null,
				error: null,
			});
		}

		await tenantProfile.update(updates);

		tenantProfile = await TenantProfile.findByPk(tenantId);

		return res.status(200).json({
			message: 'Tenant profile updated successfully!',
			data: tenantProfile,
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
	createTenantProfile,
	getAllTenantProfiles,
	getTenantProfileById,
	deleteTenantProfileById,
	updateTenantProfileById,
};
