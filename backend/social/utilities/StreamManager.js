const { UserProfile } = require('../models/userProfile');
const { TenantProfile } = require('../models/tenantProfile');

const tempTenantArr = [];
const tempUserArr = [];

const createUser = async (properties) => {
	try {
		const existingUser = await UserProfile.findOne({
			where: { user_id: properties.id },
		});

		if (existingUser) {
			console.log('User already exists');
		} else {
			await UserProfile.create({
				user_id: properties.id,
				first_name: properties.first_name,
				last_name: properties.last_name,
				department: properties.department,
				designation: properties.designation,
				tenant_id: properties.tenant_id,
				image_url: properties.image_url,
				city: properties.city,
				country: properties.country,
				bio: properties.bio,
				social_links: properties.social_links,
				employee_id: properties.employee_id,
			});

			console.log('User created successfully!');
		}
	} catch (error) {
		console.log({ error });
	}
};

const createTenant = async (properties) => {
	try {
		const existingTenant = await TenantProfile.findOne({
			where: { tenant_id: properties.id },
		});

		if (existingTenant) {
			console.log('Tenant already exists!');
		} else {
			await TenantProfile.create({
				tenant_id: properties.id,
				tenant_name: properties.name,
				address: properties.address,
				city: properties.city,
				state: properties.state,
				country: properties.country,
				zip_code: properties.zip_code,
				phone: properties.phone,
				web_url: properties.web_url,
			});

			console.log('Tenant created successfully!');
		}
	} catch (error) {
		console.log({ error });
	}
};

const countAllLogs = () => {
	if (tempTenantArr.length === 10 && tempUserArr.length === 10) {
		return true;
	} else {
		return false;
	}
};

const processMessage = async (kafkaMessage) => {
	if (kafkaMessage.event_name === 'user_created') {
		tempUserArr.push(kafkaMessage);
	}

	if (kafkaMessage.event_name === 'tenant_created') {
		tempTenantArr.push(kafkaMessage);
	}

	if (countAllLogs()) {
		for (let user of tempUserArr) {
			await createUser(user.properties);
		}

		for (let tenant of tempTenantArr) {
			await createTenant(tenant.properties);
		}
	}
};

module.exports = { processMessage };
