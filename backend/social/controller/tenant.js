const express = require("express");
const router = express.Router();
const tenantApi = require("../api/tenant");

router.get("/", tenantApi.get);
router.post("/", tenantApi.create);
router.patch("/:id", tenantApi.update);
router.delete("/:id", tenantApi.delete)

// TODO add supported routes here

module.exports = router;