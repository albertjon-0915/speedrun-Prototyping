const express = require("express");
const router = express.Router();
const User = require("../controllers/users");

const { verify } = require("../auth");

router.get("/", verify, User.Details);
router.post("/register", User.Register);
router.post("/login", User.Login);

module.exports = router;
