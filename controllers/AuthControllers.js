const Customer = require("../models/Customer");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const { registerUsers, loginUsers } = require("../utils/auth");

const register = async (req, res) => {
  try {
    // const newCustomer = await registerUsers(req.body, Customer);

    const { fullName, email, password, phone } = req.body;

    // Check if the email already exists
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      response.badRequest(res, "Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer
    const newCustomer = await Customer.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });
    response.created(res, newCustomer);
  } catch (error) {
    console.error("Error registering customer:", error);
    response.error(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    // const user = await loginUsers(req.body, Customer, "customer");

    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      response.notFound(res, "Email Not Found");
    }

    // Compare the password
    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      response.badRequest(res, "Invalid password");
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
    response.error(res, error.message, error.status);
  }
};

const adminRegister = async (req, res) => {
  try {
    // const newAdmin = await registerUsers(req.body, Admin);

    const { fullName, email, password, phone } = req.body;

    // Check if the email already exists
    const existingCustomer = await Admin.findOne({ where: { email } });
    if (existingCustomer) {
      response.badRequest(res, "Email already exists");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer
    const newAdmin = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });

    response.created(res, newAdmin);
  } catch (error) {
    console.log("Error registering admin:", error);
    return response.badRequest(res, "Email already exists");
  }
};

const adminLogin = async (req, res) => {
  try {
    // const admin = await loginUsers(req.body, Admin, "admin");

    const { email, password } = req.body;
    const customer = await Admin.findOne({ where: { email } });

    if (!customer) {
      response.notFound(res, "Email Not Found");
      return;
    }

    // Compare the password
    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      response.badRequest(res, "Invalid password");
      return;
    }

    const token = jwt.sign(
      { id: customer.id },
      process.env.ADMIN_JWT_SECRET_KEY,
      {
        expiresIn: "696969m",
      }
    );

    const adminData = {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      token,
    };

    response.success(res, adminData);
  } catch (error) {
    console.error("Error logging in:", error);
    response.error(res, error.message, error.status);
  }
};

module.exports = {
  register,
  login,
  adminRegister,
  adminLogin,
};
