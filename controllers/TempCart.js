const response = require("../utils/response");
const carts = [];
// const Cart = Object.create({
//   id: null,
//   customerId: null,
//   items: [],
//   totalPrice: 0,
// });

// const a = new Cart(1, 2, 3);
// console.log(a);

let cartFormat =  {
  id: Date.now(),
  customerId: null,
  items: [{ productId: null, quantity: null }],
  totalPrice: 0,
};

const addToCart = async (req, res) => {
  const { customerId, item, quantity } = req.body;
  const cart = carts.find(cart => cart.customerId == customerId)

  if(cart) {
      console.log(cart)
      cart.items.push({ customerId, item, quantity })
    // cart.push({ customerId, productId, quantity });
    response.success(res, cart, "WIWI");
    return
  }

  const newCart = {
    id: Date.now(),
    customerId,
    items: [{ item, quantity }],
    totalPrice: 0,
  }
  carts.push(newCart);
  // cart.push({ customerId, productId, quantity });
  response.success(res, newCart, "WIWI");
};

const getCartItems = async (req, res) => {
  const cart = carts.find(cart => cart.customerId === req.body.customerId)
  response.success(res, cart, "WIWI");
};

module.exports = { getCartItems, addToCart };
