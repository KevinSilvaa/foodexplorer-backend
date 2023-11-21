const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);

const dishesRoutes = Router();

const DishesController = require('../controllers/DishesController');
const DishImageController = require("../controllers/DishImageController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesController = new DishesController();
const dishImageController = new DishImageController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", verifyUserAuthorization("admin"), dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), dishesController.delete);
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), dishesController.update);

dishesRoutes.patch("/image/:id", verifyUserAuthorization("admin"), upload.single("image"), dishImageController.update);

module.exports = dishesRoutes;
