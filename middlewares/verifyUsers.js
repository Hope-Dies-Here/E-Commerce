const jwt = require("jsonwebtoken");
const response = require("../utils/response");

const isCustomer = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return response.unauthorized(res, "No token provided");
  }

  // Remove "Bearer " from the token string
  const tokenWithoutBearer = token.split(" ")[1];
  console.log(tokenWithoutBearer);
  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return response.unauthorized(res, err.message);
    }
    req.customer = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return response.unauthorized(res, "No token provided");
  }

  // Remove "Bearer " from the token string
  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(
    tokenWithoutBearer,
    process.env.ADMIN_JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return response.unauthorized(res, err.message);
      }
      req.admin = decoded;
      next();
    }
  );
};
module.exports = { isAdmin, isCustomer };
