const Customer = require("../models/Customer");
const Product = require("../models/Product");
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Cart = sequelize.define(
  "Cart",
  {
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
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }
);

Cart.belongsTo(Product, { foreignKey: "productId" });
Cart.belongsTo(Customer, { foreignKey: "customerId" });

// Cart.sync({ force: false })
//   .then(() => console.log("Cart table synced"))
//   .catch((error) => console.error("Error syncing Cart table:", error));
module.exports = Cart;
