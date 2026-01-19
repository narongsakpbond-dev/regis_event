const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registration.controller");

router.get("/", registrationController.listPublicRegistrations);
router.post("/", registrationController.createRegistration);

module.exports = router;
