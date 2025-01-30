const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, resp, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        resp.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded;
      console.log("decoded=", req.user);
      next();
    });

    if (!token) {
      resp.status(401);
      throw new Error("User is not authorised or token is missing");
    }
  }
});

module.exports = validateToken;
