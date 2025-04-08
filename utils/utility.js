const { CartItem, Cart } = require("../models/Cart");
const Customer = require("../models/Customer");
const Product = require("../models/Product");

const getTotalPrice = (items) => {
  return items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

const cartResponseFormat = (items) => {
  return {
   items: items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price,
      cost: `$${(item.quantity * item.price).toFixed(2)}`, // Calculate cost for each item
      cartId: item.cartId,
    })) || [],
    totalCost: `$${getTotalPrice(items).toFixed(2)}` || `$${0.0}`,
  };
};

module.exports = {
  getTotalPrice,
  cartResponseFormat,
};
