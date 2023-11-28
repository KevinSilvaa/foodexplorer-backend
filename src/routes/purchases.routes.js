const { Router } = require("express");

const purchasesRoutes = Router();

const PurchasesController = require("../controllers/PurchasesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const purchasesController = new PurchasesController();

purchasesRoutes.use(ensureAuthenticated);

purchasesRoutes.post("/", purchasesController.create);
purchasesRoutes.get("/", purchasesController.index);
purchasesRoutes.patch("/:id", verifyUserAuthorization("admin"), purchasesController.update);

module.exports = purchasesRoutes;
