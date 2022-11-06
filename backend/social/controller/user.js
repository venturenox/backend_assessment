const express = require("express");

const router = express.Router();

const userApi = require("../api/user");

router.get("/", userApi.get);
router.post("/", userApi.create);
router.patch("/:id", userApi.update);
router.delete("/:id", userApi.delete)

// TODO add supported routes here

module.exports = router;