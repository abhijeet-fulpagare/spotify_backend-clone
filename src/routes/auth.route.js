const express = require("express");
const {userRegister,loginUser,logoutUser} = require("../controllers/auth.controller")



const router = express.Router();

router.post("/register", userRegister)
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;