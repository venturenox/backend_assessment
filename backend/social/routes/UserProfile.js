const express = require("express")
const router = express.Router()
const crudService = require("../services/CrudService")
const UserProfile = require("../models/UserProfile")

//Create Data
router.post("/create", async (req, res, next) => {
  try {
    const response = await crudService.store(UserProfile, req.body)

    return response.statusCode === 200
      ? res.status(response.statusCode).json({
          message: "Record created successfully!",
          userProfile: response.data,
        })
      : res.status(response.statusCode).json({
          message: "Something Went Wrong",
          error: response.error,
        })
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//Update Data
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const response = await crudService.update(UserProfile, req.body, { user_id: id })

    return response.statusCode === 200
      ? res.status(response.statusCode).json({
          message: "Record Updated successfully!",
        })
      : response.statusCode === 404
      ? res.status(response.statusCode).json({
          message: "Record Not Found!",
        })
      : res.status(response.statusCode).json({
          message: "Something Went Wrong",
          error: response.error,
        })
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//Get All Records
router.get("/", async (req, res, next) => {
  try {
    const response = await crudService.getAll(UserProfile)

    return response.statusCode === 200
      ? res.status(response.statusCode).json({
          message: "Records Fetched successfully!",
          userProfiles: response.data,
        })
      : res.status(response.statusCode).json({
          message: "Something Went Wrong",
          error: response.error,
        })
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//Get Single Record
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const response = await crudService.getSingle(UserProfile, { user_id: id })

    return response.statusCode === 200
      ? res.status(response.statusCode).json({
          message: "Record Fetched successfully!",
          userProfile: response.data,
        })
      : response.statusCode === 404
      ? res.status(response.statusCode).json({
          message: "Record Not Found!",
        })
      : res.status(response.statusCode).json({
          message: "Something Went Wrong",
          error: response.error,
        })
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//Delete Single Record
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const response = await crudService.delete(UserProfile, { user_id: id })

    return response.statusCode === 200
      ? res.status(response.statusCode).json({
          message: "Record Deleted successfully!",
        })
      : response.statusCode === 404
      ? res.status(response.statusCode).json({
          message: "Record Not Found!",
        })
      : res.status(response.statusCode).json({
          message: "Something Went Wrong",
          error: response.error,
        })
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

module.exports = router
