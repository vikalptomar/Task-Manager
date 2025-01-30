const express = require("express");
const router = express.Router();
const { signup,login,currentUser } = require("../controllers/userController");
const validateToken=require("../middleware/validateTokenHandler");

// router.route("/login").post(login);
router.post("/signup",signup);
router.post("/login",login);
router.get("/current",validateToken,currentUser);

// router.route("/signup").post(signup);
// router.route("/login").post(login);
// router.route("/current").get(currentUser);
module.exports=router;