const supabase = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../utils/response");

const register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const { data: existingCustomer, error: findError } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();

    if (findError && findError.code !== "PGRST116") {
      return response.error(res, "Error checking existing customer");
    }

    if (existingCustomer) {
      return response.badRequest(res, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newCustomer, error: createError } = await supabase
      .from("customers")
      .insert([{ fullName, email, password: hashedPassword, phone }])
      .single();

    if (createError) {
      return response.error(res, "Error creating customer");
    }

    response.created(res, newCustomer);
  } catch (error) {
    console.error("Error registering customer:", error);
    response.error(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: customer, error: findError } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();

    if (findError) {
      return response.error(res, "Error fetching customer");
    }

    if (!customer) {
      return response.notFound(res, "Email Not Found");
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      return response.badRequest(res, "Invalid password");
    }

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "696969m",
    });

    const customerData = {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      token,
    };

    response.success(res, customerData);
  } catch (error) {
    console.error("Error logging in:", error);
    response.error(res, error.message);
  }
};

const adminRegister = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const { data: existingAdmin, error: findError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (findError && findError.code !== "PGRST116") {
      return response.error(res, "Error checking existing admin");
    }

    if (existingAdmin) {
      return response.badRequest(res, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newAdmin, error: createError } = await supabase
      .from("admins")
      .insert([{ fullName, email, password: hashedPassword, phone }])
      .single();

    if (createError) {
      return response.error(res, "Error creating admin");
    }

    response.created(res, newAdmin);
  } catch (error) {
    console.error("Error registering admin:", error);
    response.error(res, error.message);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: admin, error: findError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (findError) {
      return response.error(res, "Error fetching admin");
    }

    if (!admin) {
      return response.notFound(res, "Email Not Found");
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return response.badRequest(res, "Invalid password");
    }

    const token = jwt.sign({ id: admin.id }, process.env.ADMIN_JWT_SECRET_KEY, {
      expiresIn: "696969m",
    });

    const adminData = {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      token,
    };

    response.success(res, adminData);
  } catch (error) {
    console.error("Error logging in:", error);
    response.error(res, error.message);
  }
};

module.exports = {
  register,
  login,
  adminRegister,
  adminLogin,
};
