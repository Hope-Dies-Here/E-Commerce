const getTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.totalPrice, 0);
}

const cartResponseFormat = (cartItems) => {
  return {
    cartItems: cartItems,
    totalPrice: getTotalPrice(cartItems) || 0.00,
  };
}

module.exports = {
  getTotalPrice, cartResponseFormat
};