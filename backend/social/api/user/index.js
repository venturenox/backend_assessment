const { User } = require('../../models/schema')
module.exports = {
  create:async (req, res) => {
    const { body } = req;

    let isError = false;
    const newUser = await User.query().insert({
      first_name: body.first_name,
      last_name: body.last_name,
      department: body.department,
      tenant_id: body.tenant_id,
      designation: body.designation,
      image_url: body.image_url,
      city: body.city,
      country: body.country,
      bio: body.bio,
      social_links: body.social_links,
      employee_id : body.employee_id
    })
    .catch((error) => {
      console.log(error.message);
      isError = true;
    });

    if(isError){
      return res.status(500).send("Unable to create new User");
    }
    return res.status(200).json(newUser);

  },


  get:async(req,res) => {
    const {id} = req.query;
    
    let isError = false;
    if(id) {
      const user = await User.query().findById(id)
      .catch((error) => {
        console.log(error.message);
        isError = true;
      })
      if(isError){
        return res.status(500).send("Unable to fetch user by id");
      }
      return res.status(200).json(user);
    }

    const users = await User.query()
      .catch((error) => {
        console.log(error.message);
        isError = true;
      })
      if(isError){
        return res.status(500).send("Unable to fetch users");
      }
      return res.status(200).json(users);
  },



  update: async(req, res) => {
    const { id } = req.params;
    const { body: patchDto } = req;

    if(!id) {
      return res.status(400).send("ID not found in params");
    }

    let isError = false;

    const user = await User.query()
    .findById(id)
    .patch({
      ...patchDto
    })
    .catch(error => {
      console.log(error.message);
      isError = true;
    })

    if(isError){
      return res.status(500).send("Unable to upadate user");
    }
    return res.status(200).json(user);
  },

  delete: async(req, res) => {
    const { id } = req.params;
    let isError = false;

    if(!id) {
      return res.status(400).send("ID not found in params");
    }

    const user = await User.query().deleteById(id)
    .catch(error => {
      console.log(error.message);
      isError = true;
    })

    if(isError){
      return res.status(500).send("Unable to upadate user");
    }
    return res.status(200).json(user);
  }
}