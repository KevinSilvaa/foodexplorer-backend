const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesController {

  // Create a new dish
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body;

    const checkDishExists = await knex("dishes").where({ name }).first();

    if (checkDishExists) {
      throw new AppError("Este prato já existe no cardápio");
    }

    console.log(request.file.filename)
    const imageFilename = request.file.filename;
    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFilename);

    const [dish_id] = await knex("dishes").insert({
      image: filename,
      name,
      description,
      price,
      category
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json({
      message: "Dish created!"
    });
  }

  // Show a dish based on the id
  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id });

    return response.json({
      ...dish,
      ingredients
    });
  }

  // Delete a dish that is already created
  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json({
      message: "Dish deleted!"
    });
  }

  // Show all dishes that are created
  async index(request, response) {
    const { name, ingredients } = request.query;

    let dishes;

    if (ingredients) {

      dishes = await knex("ingredients")
        .select("*")
        .whereLike("ingredients.name", `%${ingredients}%`)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name")
    } else {
      dishes = await knex("dishes")
        .select("*")
        .whereLike("dishes.name", `%${name}%`)
        .orderBy("name");
    }

    const userIngredients = await knex("ingredients").select("*");

    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients
      }
    });

    return response.json(dishesWithIngredients);
  }

  // Update a dish that is already created
  async update(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    dish.name = name ?? dish.name;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;
    dish.description = description ?? dish.description;

    await knex("dishes").where({ id }).update(dish)
    await knex("dishes").where({ id }).update("updated_at", knex.fn.now());

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id }).delete();

      const ingredientsInsert = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id: id
        }
      });

      await knex("ingredients").insert(ingredientsInsert);
    }

    return response.json({
      message: "Dish updated!"
    });
  }
}

module.exports = DishesController;
