const Customer = require("../models/Customer");
const Product = require("../models/Product");
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Cart = sequelize.define("Cart", {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: uuidv4,
  //   primaryKey: true,
  //   allowNull: false,
  // },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id',
    },
    onDelete: 'CASCADE', // If the customer is deleted, delete their cart
    onUpdate: 'CASCADE', // If the customer ID is updated, update the cart's customerId
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    // Timestamps are not needed for CartItem
    timestamps: false,
  }
);

// Establishing relationships
Cart.hasMany(CartItem);

CartItem.belongsTo(Cart, { foreignKey: "cartId", onDelete: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
Cart.belongsTo(Customer, { foreignKey: "customerId", onDelete: "CASCADE" });

// Customer.hasOne(Cart);
CartItem.sync({ alter: true });
Cart.sync({ alter: true })
  .then(() => console.log("Cart table synced"))
  .catch((error) => console.error("Error syncing Cart table:", error));

const createDummy = async (req, res) => {
  const cart = await Cart.create({
    totalPrice: 0, // Default total price
    customerId: 1, // Assuming a customer with ID 1 exists, change as needed
  });

  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("Dummy Cart Created:", cart.toJSON());
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
  // Create a dummy CartItem for the new cart
  const cartItem = await CartItem.create({
    cartId: cart.id,
    productId: 14, // Assuming a product with ID 1 exists, change as needed
    quantity: 1, // Default quantity
    price: 0, // Default price
  });
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("Dummy CartItem Created:", cartItem.toJSON());
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
};

createDummy()
  .then(() => console.log("Dummy CartItem Created"))
  .catch((error) => console.error("Error creating dummy CartItem:", error));
module.exports = { Cart, CartItem };
