const knex = require("../database/knex");

class PurchasesController {

  // Create a new purchase based on user cart
  async create(request, response) {
    const user_id = request.user.id;

    const UserRequests = await knex("requests").select([
      "requests.id",
      "requests.quantity",
      "dishes.name",
      "dishes.price",
      "dishes.image"
    ])
      .innerJoin("dishes", "dishes.id", "requests.dish_id")
      .where({ user_id });

    const requestsWithTotalPrice = UserRequests.map(request => {
      return {
        ...request,
        subTotal: request.price.replace(",", ".") * request.quantity
      };
    });

    const requestDetails = requestsWithTotalPrice.reduce((acc, item) => acc + `${item.quantity} X ${item.name}, `, "")

    await knex("purchases").insert({
      user_id,
      details: requestDetails
    });

    await knex("requests").delete().where({ user_id });

    return response.status(201).json({
      user_id,
      details: requestDetails,
      status: "pending"
    });
  }

  // Show all purchases that user already did
  async index(request, response) {
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();
    const isAdmin = user.role === "admin";

    let purchases;

    if (isAdmin) {
      purchases = await knex("purchases");
    } else {
      purchases = await knex("purchases").where({ user_id });
    }

    return response.json(purchases);
  }

  // Update the status of purchase
  async update(request, response) {
    const { status } = request.body;
    const { id } = request.params;

    await knex("purchases").update({ status, updated_at: knex.fn.now() }).where({ id });

    return response.json({ status });
  }
}

module.exports = PurchasesController;
