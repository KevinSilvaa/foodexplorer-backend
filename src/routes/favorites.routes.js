const { Router } = require("express");

const favoritesRoutes = Router();

const FavoritesController = require("../controllers/FavoritesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.delete("/:id", favoritesController.delete);

module.exports = favoritesRoutes;
