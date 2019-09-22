const express = require("express");
const router = express.Router();

const { catchErrors } = require("../errorHandlers");
const { register, login } = require("../controller/auth.controller");
const registerValidator = require("../validators/registration");

router.post("/register", registerValidator, catchErrors(register));
router.post("/login", catchErrors(login));

module.exports = router;
