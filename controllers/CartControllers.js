const Cart = require("../models/Cart");
const response = require("../utils/response");
const Product = require("../models/Product");
const { sequelize } = require("../config/db");
const { getTotalPrice, cartResponseFormat } = require("../utils/utility");

const addToCart = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      response.notFound(res, "Product not found");
    }

    if (product.stockQuantity < quantity) {
      return response.badRequest(res, "Not enough stock available");
    }

    // Check if the cart item already exists
    const existingCartItem = await Cart.findOne({
      where: {
        customerId,
        productId,
      },
    });

    if (existingCartItem) {
      // const product = await Product.findByPk(productId);
      // Update the existing cart item
      if (existingCartItem.quantity + quantity > product.stockQuantity) {
        return response.badRequest(res, "Not enough stock available");
      }

      existingCartItem.quantity = existingCartItem.quantity + quantity;
      existingCartItem.totalPrice =
        (existingCartItem.quantity + quantity) * product.price;
      await existingCartItem.save();

      const cartItems = await Cart.findAll({
        where: { customerId },
        include: [{ model: Product, attributes: ["name", "price"] }],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return response.success(
        res,
        cartResponseFormat(cartItems),
        "Item added to cart successfully"
      );
    }

    // If the item is not in the cart, create a new cart item
    const newCartItem = await Cart.create({
      productId,
      customerId,
      quantity,
      totalPrice: product.price * quantity,
    });
    console.log("New cart item created:", newCartItem.toJSON());
    const cartItems = await Cart.findAll({
      where: { customerId },
      include: [{ model: Product, attributes: ["name", "price"] }],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    response.success(
      res,
      cartResponseFormat(cartItems),
      "Item added to cart successfully"
    );
  } catch (error) {
    console.error(error);
    response.error(res, error.message);
  }
};

const getCartItems = async (req, res) => {
  try {
    console.log("req.user", req.customer);
    const cartItems = await Cart.findAll({
      where: { customerId: req.customer.id || req.query.c },
      include: [{ model: Product, attributes: ["name", "price"] }],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (cartItems.length == 0) {
      return response.success(res, [], "Cart is empty");
    }

    response.success(
      res,
      cartResponseFormat(cartItems),
      "Cart items retrieved successfully"
    );
  } catch (error) {
    console.log(error);
    response.error(res, error.message);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.destroy({
      where: { id },
    });

    if (!deleted) {
      return response.notFound(res, "Cart item not found");
    }

    const cartItems = await Cart.findAll({
      where: { customerId: req.customer.id },
      include: [{ model: Product, attributes: ["name", "price"] }],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    response.success(
      res,
      cartResponseFormat(cartItems),
      "Cart item removed successfully"
    );
  } catch (error) {
    console.error("Error deleting cart item:", error);
    response.error(res, error.message);
  }
};

const clearCart = async (req, res) => {
  try {
    const { customerId } = req.query;
    const deleted = await Cart.destroy({
      where: { customerId },
    });

    if (!deleted) {
      return response.notFound(res, "Cart item not found");
    }
    response.success(res, cartResponseFormat([]), "Cart cleared successfully");
  } catch (error) {
    console.error("Error deleting cart item:", error);
    response.error(res, error.message);
  }
};

const checkout = async (req, res) => {
  try {
    const { customerId } = req.query;
    const cartItems = await Cart.findAll({
      where: { customerId },
    });
    const totalPrice = getTotalPrice(cartItems);

    if (cartItems.length == 0) {
      return response.badRequest(res, "Cart is empty");
    }

    // Check if all items are in stock
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (product.stockQuantity < item.quantity) {
        return response.badRequest(res, "Not enough stock available");
      }
    }

    // Payment logic can be added here
    const payForItems = () => {
      console.log("Payment processing...");

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Payment Failed"));
        }, 2000);
      });
    };
    const paymentStatus = await payForItems();
    console.log(paymentStatus);

    // Deduct stock from products
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    await Cart.destroy({
      where: { customerId },
    });

    response.success(
      res,
      cartResponseFormat([]),
      `Purchase successful, total price: ${totalPrice}`
    );
  } catch (error) {
    console.error("Error deleting cart item:", error);
    response.error(res, error.message);
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
  checkout,
};
