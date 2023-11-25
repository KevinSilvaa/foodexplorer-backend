const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");
const favoritesRouter = require("./favorites.routes");
const requestsRoutes = require("./requests.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

routes.use("/dishes", dishesRouter);
routes.use("/favorites", favoritesRouter);

routes.use("/requests", requestsRoutes);

module.exports = routes
