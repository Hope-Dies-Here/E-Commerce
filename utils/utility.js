const { CartItem, Cart } = require("../models/Cart");
const Customer = require("../models/Customer");
const Product = require("../models/Product");

const getTotalPrice = (items) => {
  return items.reduce(
    (total, item) => total + item.quantity * item.Product.price,
    0
  );
};

const fetchCartItems = async (cartId) => {
  const cartItems = await CartItem.findAll({
    where: { cartId },
    include: [
      {
        model: Product,
        attributes: ["name", "price"],
      },
      {
        model: Cart,
        attributes: ["customerId", "id"],
        include: [
          {
            model: Customer,
            attributes: ["fullName", "email", "phone", "balance"]
          }
        ]
      },
    ],
  });
  return cartItems;
};

const cartResponseFormat = (customerId, cartItems, extra) => {
  return {
    customer: {
      id: customerId.id,
      fullName: customerId.fullName,
      email: customerId.email,
      phone: customerId.phone,
      balance: customerId.balance || 0.0,
    },
    cartItems: cartItems.map((item) => ({
      id: item.id,
      name: item.Product.name,
      quantity: item.quantity,
      price: item.Product.price,
      cost: `$${(item.quantity * item.Product.price).toFixed(2)}`, // Calculate cost for each item
      cartId: item.cartId,
    })) || [],
    totalPrice: `$${getTotalPrice(cartItems).toFixed(2)}` || `$${0.0}`,
  };
};

module.exports = {
  getTotalPrice,
  fetchCartItems,
  cartResponseFormat,
};
