const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers;

  if (!authHeader.cookie) {
    throw new AppError("Not informed JWT Token", 401);
  }

  const [, token] = authHeader.cookie.split("token=");

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token", 401);
  }
}

module.exports = ensureAuthenticated;
