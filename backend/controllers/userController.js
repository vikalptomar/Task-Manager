const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@description signup User
//@route api/user/signup
//@access public
const signup = asyncHandler(
  async (req, resp) => {
    const { userName, email, password, phone } = req.body;
    if (!userName || !email || !password || !phone) {
      resp.status(400);
      throw new Error("All fields are mandatory");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await user.create({
      userName,
      email,
      password: hashedPassword,
      phone,
    });
    resp.status(201).json({ status: 200, createUser });
  },
  (error, req, resp, next) => {
    resp.status(500).json({ error: error.message });
  }
);

// @description Login User
// @route POST /api/users/login
// @access public
const login = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    resp.status(400);
    throw new Error("All fields are required");
  }

  const selectedUser = await user.findOne({ email });
  if (selectedUser) {
    const decryptHashedPassword = await bcrypt.compare(
      password,
      selectedUser.password
    );
    if (decryptHashedPassword) {
      const accessToken = jwt.sign(
        {
          userName: selectedUser.userName,
          email: selectedUser.email,
          id: selectedUser.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "61m" }
      );
      console.log("accessToken=", accessToken);
      resp.status(200).json({ accessToken, message: "Success", successCode: 1 });
    } else {
      resp
        .status(200)
        .json({
          accessToken: "",
          message: "Password Incorrect",
          successCode: 0,
        });
      throw new Error("Password is not valid");
    }
  } else {
    resp.status(200).json({ message: "Email Incorrect" });
    throw new Error("Email is not valid");
  }
});

// @description Current User
// @route get /api/users/current
// @access public
const currentUser = asyncHandler(async (req, resp) => {
  resp.json(req.user);
  // resp.json({ message: "current user Information" });
});

module.exports = {
  signup,
  login,
  currentUser,
};
