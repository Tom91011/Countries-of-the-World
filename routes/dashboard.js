const express = require("express");

const { dashboardView } = require("../controllers/dashboardController");
const router = express.Router();

router.get("/", dashboardView)

module.exports = router;