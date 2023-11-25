const { Router } = require("express");

const requestsRoutes = Router();

const RequestsController = require("../controllers/RequestsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const requestsController = new RequestsController();

requestsRoutes.use(ensureAuthenticated);

requestsRoutes.post("/", requestsController.create);
requestsRoutes.get("/", requestsController.index);
requestsRoutes.delete("/:id", requestsController.delete);

module.exports = requestsRoutes;
