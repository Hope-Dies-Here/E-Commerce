const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("./response");

const registerUsers = async (body, User) => {
  const { fullName, email, password, phone } = body;
  // Check if the email already exists
  const existingCustomer = await User.findOne({ where: { email } });
  if (existingCustomer) {
    throw new Error("Email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new customer
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phone,
  });

  return newUser;
};

const loginUsers = async (body, User, role) => {
    const { email, password } = body
    const customer = await User.findOne({ where: { email } });

    if (!customer) {
      const error = new Error("Email Not Found");
      error.status = 404;
      throw error;
    }

    // Compare the password
    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      const error = new Error("Invalid password");
      error.status = 400;
      throw error;
    }

    const token = jwt.sign(
      { id: customer.id },
      role == "admin" ? process.env.ADMIN_JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
      {
        expiresIn: "696969m",
      }
    );

    return {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      token,
    };
}

module.exports = { registerUsers, loginUsers };
