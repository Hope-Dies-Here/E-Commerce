const Customer = require("../models/Customer");
const response = require("../utils/response");


const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const profile = async (req, res) => {
  const { id } = req.customer;
  try {
    const customer = await Customer.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!customer) {
      return response.notFound(res, "Customer not found");
    }

    response.success(res, customer);
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    response.error(res, error.message);
  }
};

module.exports = {
  getCustomers,
  profile,
};
