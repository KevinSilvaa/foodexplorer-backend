const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class FavoritesController {

  // Favorite a specific dish bases on dish id
  async create(request, response) {
    const { dish_id } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();
    const dish = await knex("dishes").where({ id: dish_id }).first();


    if (!user) {
      throw new AppError("Usuário não encontrado.")
    }

    if (!dish) {
      throw new AppError("Prato não encontrado.");
    }

    await knex("favorites").insert({ user_id, dish_id });

    return response.status(201).json({ message: `Prato com id ${dish_id} favoritado com sucesso!` });
  }

  // Show all favorites dishes from a specific user based on user id
  async index(request, response) {
    const user_id = request.user.id;

    const favoriteDishes = await knex("favorites")
      .select(["dish_id", "dishes.name", "dishes.image", "favorites.id"])
      .innerJoin("dishes", "dishes.id", "favorites.dish_id")
      .where("favorites.user_id", user_id);

    return response.json(favoriteDishes);
  }

  // Remove favorite from a specific dish based on dish id
  async delete(request, response) {
    const { id } = request.params;

    await knex("favorites").where({ dish_id: id }).delete();

    return response.json({ message: "Dish removed from favorites successfully!" });
  }
}

module.exports = FavoritesController;
