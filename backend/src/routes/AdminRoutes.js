const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");
const adminController = require("../controllers/admin.controller");

router.put("/seats", adminAuth, adminController.updateSeats);
router.get("/registrations", adminAuth, adminController.listAdminRegistrations);

module.exports = router;
