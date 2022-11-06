const { Tenant } = require("../../models/schema");
module.exports = {
  create: async (req, res) => {
    const { body } = req;

    let isError = false;
    const newTenant = await Tenant.query().insert({
      web_url: body.web_url,
      name: body.tenant_name,
      address: body.address,
      city: body.city,
      state: body.state,
      country: body.country,
      zip_code: body.zip_code,
      phone: body.phone
    })
    .catch((error) => {
      console.log(error.message);
      isError = true;
    });

    if(isError){
      return res.status(500).send("Unable to create new tenant");
    }
    return res.status(200).json(newTenant);
  },

  get: async (req, res) => {
    const {id} = req.query;
    
    let isError = false;
    if(id) {
      const tenant = await Tenant.query().findById(id)
      .catch((error) => {
        console.log(error.message);
        isError = true;
      })
      if(isError){
        return res.status(500).send("Unable to fetch tenant by id");
      }
      return res.status(200).json(tenant);
    }

    const tenants = await Tenant.query()
      .catch((error) => {
        console.log(error.message);
        isError = true;
      })
      if(isError){
        return res.status(500).send("Unable to fetch tenants");
      }
      return res.status(200).json(tenants);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { body: patchDto } = req;

    if(!id) {
      return res.status(400).send("ID not found in params");
    }

    let isError = false;

    const tenant = await Tenant.query()
    .findById(id)
    .patch({
      ...patchDto
    })
    .catch(error => {
      console.log(error.message);
      isError = true;
    })

    if(isError){
      return res.status(500).send("Unable to upadate tenant");
    }
    return res.status(200).json(tenant);
  },

  delete: async(req, res) => {
    const { id } = req.params;
    let isError = false;

    if(!id) {
      return res.status(400).send("ID not found in params");
    }

    const tenant = await Tenant.query().deleteById(id)
    .catch(error => {
      console.log(error.message);
      isError = true;
    })

    if(isError){
      return res.status(500).send("Unable to upadate tenant");
    }
    return res.status(200).json(tenant);
  }
}