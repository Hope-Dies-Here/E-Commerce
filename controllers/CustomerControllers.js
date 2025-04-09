const supabase = require("../config/database");
const response = require("../utils/response");

const getCustomers = async (req, res) => {
  try {
    const { data: customers, error } = await supabase.from("customers").select("*");

    if (error) {
      return response.error(res, "Error fetching customers");
    }

    response.success(res, customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    response.error(res, error.message);
  }
};

const profile = async (req, res) => {
  const { id } = req.customer;
  try {
    const { data: customer, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return response.error(res, "Error fetching customer profile");
    }

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
