const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class RequestsController {

  // Add dish in user cart
  async create(request, response) {
    const { dish_id, quantity } = request.body;

    const user_id = request.user.id;
    const dish = await knex("dishes").where({ id: dish_id }).first();

    const requestAlreadyExists = await knex("requests").where({ dish_id, user_id }).first();

    let id;

    if (requestAlreadyExists) {
      const updatedRequest = { ...requestAlreadyExists, quantity };

      await knex("requests").update(updatedRequest).where({ dish_id, user_id });
      id = requestAlreadyExists.id;
    } else {
      await knex("requests").insert({ user_id, dish_id, quantity });
    }

    const price = dish.price.replace(",", ".");

    const newRequest = {
      id,
      dish_id,
      user_id,
      quantity,
      dish_name: dish.name,
      dish_price: price,
      dish_image: dish.image,
      subTotal: price * quantity
    }

    return response.status(201).json(newRequest);
  }

  // Show all dishes that are in user cart
  async index(request, response) {
    const user_id = request.user.id;

    const userRequest = await knex("requests")
      .select([
        "requests.id",
        "requests.quantity",
        "dishes.id as dish_id",
        "dishes.name as dish_name",
        "dishes.price",
        "dishes.image"
      ])
      .innerJoin("dishes", "dishes.id", "requests.dish_id")
      .where({ user_id })

    const requestWithSubTotal = userRequest.map(request => {
      const price = request.price.replace(",", ".");

      return {
        ...request,
        subTotal: price * request.quantity
      };
    });

    return response.json(requestWithSubTotal);
  }

  // Delete a dish in user card based on dish id
  async delete(request, response) {
    const { id } = request.params;

    const requestedDish = await knex("requests").where({ id }).delete();

    if (!requestedDish) {
      throw new AppError("Esta request não foi feita!");
    }

    return response.json({ message: "Request removed successfully" });
  }
}

module.exports = RequestsController;
