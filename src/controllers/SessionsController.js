const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const knex = require("../database/knex");
const authConfig = require("../configs/auth");

const AppError = require("../utils/AppError");

class SessionsController {

  // Create the user authorization on login
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Email e/ou senha incorreta", 401);
    }

    const favorites = await knex("favorites").where({ user_id: user.id });

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    });

    response.json({ token, user, favorites });
  }
}

module.exports = SessionsController;
