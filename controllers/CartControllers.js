const { Cart, CartItem } = require("../models/Cart");
const response = require("../utils/response");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const { sequelize } = require("../config/db");
const {
  getTotalPrice,
  cartResponseFormat,
} = require("../utils/utility");

const addToCart = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;

    const product = await Product.findByPk(productId, {
      attributes: { exclude: ["password"] },
    });

    if(!product) {
      response.notFound(res, "Product not found")
    }

    let cart = (() => {
      try {
        return JSON.parse(req.cookies.cart);
      } catch (error) {
        return [];
      }
    })();

    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );

    if (
      parseInt(existingCartItem?.quantity) + quantity >
      product.stockQuantity
    ) {
      return response.badRequest(res, "Not enough stock available");
    }

    if (existingCartItem) {
      // update quantity of existing item in cart
      existingCartItem.quantity = existingCartItem.quantity + quantity || 1;
      res.cookie("cart", JSON.stringify(cart));

      return response.created(
        res,
        cartResponseFormat(cart),
        "Cart Updated"
      );
    }

    const newItem = {
      id: cart.length + 1,
      product: { id: product.id, name: product.name },
      price: product.price,
      quantity: quantity || 1,
    };

    cart.push(newItem);
    res.cookie("cart", JSON.stringify(cart));
    response.created(
      res,
      cartResponseFormat(cart),
      "Item added to cart"
    );
  } catch (error) {
    console.log(error)
    response.error(res, error.message)
  }
};

const saveCart = async (req, res) => {
  // 
}

const getCartItems = async (req, res) => {
  try {
    
    let cart = (() => {
      try {
        return JSON.parse(req.cookies.cart);
      } catch (error) {
        return [];
      }
    })();

    if (cart == []) return response.success(res, [], "Cart is empty");

    response.success(res, cartResponseFormat(cart), "Cart retrived succesfully");
  } catch (error) {
    console.log(error)
    response.error(res, error.message)
  }
};

const removeFromCart = async (req, res) => {
  try {

    const id = parseInt(req.params.id);
    let cart = (() => {
      try {
        return JSON.parse(req.cookies.cart);
      } catch (error) {
        return [];
      }
    })()

    if (!id) {
      response.badRequest(res, "product id not provided");
    }

    
    const targetItem = cart.find(item => item.product.id == id) 
    const updated = cart.filter(item => item.product.id !== id) 
    console.log(updated)

    if (!targetItem) {
      return response.notFound(res, "Item not found");
    }

    res.cookie("cart", JSON.stringify(updated))
      return response.success(
        res,
        cartResponseFormat(updated),
        "Removed"
      );
    } catch (error) {
    console.error("Error deleting cart item:", error);
    response.error(res, error.message);
  }
};

const clearCart = async (req, res) => {
  try {
    res.cookie("cart", null);
    response.success(res, [], "Cart cleared successfully");
  } catch (error) {
    console.error("Error deleting cart item:", error);
    response.error(res, error.message);
  }
};

const checkout = async (req, res) => {
  try {
    
    let cart = (() => {
      try {
        return JSON.parse(req.cookies.cart);
      } catch (error) {
        return [];
      }
    })()

    if (cart.length == 0) {
      return response.badRequest(res, "Cart is empty");
    }

    // Check if all items are in stock
    for (const item of cart) {
      const product = await Product.findByPk(item.product.id);
      if (product.stockQuantity < item.quantity) {
        return response.badRequest(res, `Not enough stock available for '${product.name}'`);
      }
    }

    // Payment logic can be added here
    const payForItems = () => {
      console.log("Payment processing...");

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(new Error("Payment Failed"));
        }, 2000);
      });
    };

    const paymentStatus = await payForItems();

    // Deduct stock from products
    for (const item of cart) {
      const product = await Product.findByPk(item.product.id);
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    const totalCost = getTotalPrice(cart)
    console.log(cart)
    res.cookie("cart", null)

    response.success(
      res,
      [],
      `Purchase successful, total cost: ${totalCost}`
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
