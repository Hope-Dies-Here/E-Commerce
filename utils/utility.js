const getTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.Product.price, 0);
}

const cartResponseFormat = (customerId, cartItems) => {
  return {
    customer: {
      id: customerId.id,
      fullName: customerId.fullName,
      email: customerId.email,
      phone: customerId.phone,
      balance: customerId.balance || 0.00
    },
    cartItems: cartItems.map(cartItems => ({
      id: cartItems.id,
      name: cartItems.Product.name,
      quantity: cartItems.quantity,
      price: cartItems.Product.price,
      cost: `$${(cartItems.quantity * cartItems.Product.price).toFixed(2)}` // Calculate cost for each item
    })),
    totalPrice: getTotalPrice(cartItems) || 0.00,
  };
}

module.exports = {
  getTotalPrice, cartResponseFormat
};