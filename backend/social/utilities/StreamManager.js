const processMessage = async (kafkaMessage) => {
	
	//Start working here
	const events = ['tenant_created', 'user_created'];
	if (kafkaMessage.event_name === events[0]){
		// event file being used
		const eventInfo = kafkaMessage.properties;
		const structuredTenantInfo = {
			id: eventInfo.id,
			tenantName: eventInfo.name,
			address: {
				name: eventInfo.address
			},
			city: eventInfo.city,
			state: eventInfo.state,
			country: eventInfo.country,
			zipCode:  eventInfo.zip_code,
			phone:  eventInfo.phone,
			webUrl: eventInfo.web_url
		};
		const { TenantService } = require('../module/tenant/tenant.service'); 
		await new TenantService().addTenant(structuredTenantInfo);
	}else if (kafkaMessage.event_name === events[1]) {
		// user file being used
		const userInfo = kafkaMessage.properties;
		const convertedUserInfo = {
			id: userInfo.id,
			firstName: userInfo.first_name,
			lastName: userInfo.last_name,
			department: userInfo.department,
			designation: userInfo.designation,
			tenantId: userInfo.tenant_id,
			imageUrl: userInfo.image_url,
			city: userInfo.city,
			country: userInfo.country,
			bio: userInfo.bio,
			socialLinks: userInfo.social_links,
			employeeId: userInfo.employee_id
		};
		const { UserService } = require('../module/user/user.service');
		await new UserService().addUser(convertedUserInfo);
	}
};

module.exports = { processMessage };

