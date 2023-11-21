const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImageController {

  // Update the dish image
  async update(request, response) {
    const { id } = request.params;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();
    
    if (!dish) {
      throw new AppError("Prato não encontrado", 401);
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const filename = diskStorage.saveFile(imageFilename);
    dish.image = filename;

    await knex("dishes").update(dish).where({ id });

    return response.json(dish);
  }
}

module.exports = DishImageController;
