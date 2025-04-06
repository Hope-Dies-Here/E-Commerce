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
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      }
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { tableName: "carts" }
);

// Cart.sync({ force: true })
const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
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
    tableName: "cartItems"
  }
);
// CartItem.sync({ force: true })


// Customer.hasOne(Cart);

// Establishing relationships
Cart.belongsTo(Customer, { foreignKey: "customerId", onDelete: "CASCADE" });

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", onDelete: "CASCADE" });

CartItem.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
console.log(CartItem.rawAttributes)

// CartItem.sync({ alter: true, logging: false });
// // Cart.sync({ alter: true, logging: false })
// //   .then(() => console.log("Cart table synced"))
// //   .catch((error) => console.error("Error syncing Cart table:", error));

// Cart.sync({ force: true })
// CartItem.sync({ force: true })
module.exports = { Cart, CartItem };
