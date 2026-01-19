const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summary.controller");

router.get("/summary", summaryController.getSummary);

module.exports = router;
