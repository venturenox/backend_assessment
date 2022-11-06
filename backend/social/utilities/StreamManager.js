const fetch = require ("node-fetch");
const processMessage = async (kafkaMessage) => {

	//Start working here
	// console.log('Here',Array.isArray(kafkaMessage))
	// console.log(kafkaMessage);


	const { event_name, properties } = kafkaMessage
	if (event_name == "tenant_created"){
		await fetch("http://localhost:4000/tenant", {
			method: "POST",
			body: JSON.stringify(properties),
			headers: {
				'Content-Type': "application/json"
			}
		})
		.then((res) => {
			if(res.status !== 200){
				throw new Error("Failed to create new tenant");
			}
			console.log("New tenant added to DB");
		})
		.catch(error => {
			console.log("Failed to add tenant to DB");
		})
	}
	else if (event_name == "user_created"){
		await fetch("http://localhost:4000/user", {
			method: "POST",
			body: JSON.stringify(properties),
			headers: {
				'Content-Type': "application/json"
			}
		})
		.then((res) => {
			if(res.status !== 200){
				throw new Error("Failed to create new user");
			}
			console.log("New User added to DB");
		})
		.catch(error => {
			console.log("Failed to add user to DB");
		})
	}

};

module.exports = { processMessage };

