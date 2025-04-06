const { Cart, CartItem } = require("../models/Cart");
const response = require("../utils/response");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const { sequelize } = require("../config/db");
const {
  getTotalPrice,
  cartResponseFormat,
  fetchCartItems,
} = require("../utils/utility");

const addToCart = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;

    let product = await Product.findByPk(productId);
    if (!product) {
      response.notFound(res, "Product not found");
    }
    // -------------------------------------------------------
    // -------------------------------------------------------

    if (product.stockQuantity < quantity) {
      return response.badRequest(res, "Not enough stock available");
    }
    // -------------------------------------------------------
    // -------------------------------------------------------

    const existingCart = await Cart.findOne({
      where: {
        customerId,
      },
      include: [
        {
          model: Customer,
          attributes: ["fullName", "email", "phone", "balance"],
        },
      ],
    });

    // this create new cart if not exist
    if (!existingCart) {
      const cart = await Cart.create(
        { customerId, totalPrice: 0 },
        {
          include: [
            {
              model: Customer,
              attributes: ["fullName", "email", "phone", "balance"],
            },
          ],
        }
      );

      // this creates new cart item
      const newCartItem = await CartItem.create({
        productId,
        cartId: cart.id,
        price: product.price,
        quantity,
        price: product.price,
      });

      const cartItems = await fetchCartItems(cart.id)
      console.log(cartItems)
      return response.success(
        res,
        cartResponseFormat(cartItems[0].Cart.Customer, cartItems, "Cart created"),
        "Cart created successfully"
      );
    }
    // -------------------------------------------------------
    // -------------------------------------------------------

    // product = await Product.findByPk(productId);
    const existingCartItem = await CartItem.findOne({
      where: {
        cartId: existingCart.id,
        productId: productId,
      },
    });

    if (!existingCartItem) {
      const newCartItem = await CartItem.create({
        productId,
        cartId: existingCart.id,
        price: product.price,
        quantity,
        price: product.price,
      });

      const cartItems = await fetchCartItems(existingCart.id);

      return response.success(res, cartResponseFormat(existingCart.Customer, cartItems), `${product.name} added to cart`);
    }

    // --------------------------------------------------------------------------
    // --------------------------------------------------------------------------

    // Update the existing cart item / more likely to be quantity change or remove
    if (existingCartItem.quantity + quantity > product.stockQuantity) {
      return response.badRequest(res, "Not enough stock available");
    }

    existingCartItem.quantity = existingCartItem.quantity + quantity;
    existingCartItem.totalPrice =
      (existingCartItem.quantity + quantity) * product.price;
    existingCartItem.totalPrice = 0;

    await existingCartItem.save();

    const cartItems = await fetchCartItems(existingCart.id);

    return response.success(
      res,
      cartResponseFormat(existingCart.Customer, cartItems),
      `${quantity} more ${product.name}${
        quantity > 1 ? "s" : ""
      } added to cart successfully`
    );
    // -------------------------------------------------------
  } catch (error) {
    console.error(error);
    response.error(res, error.message);
  }
};

const getCartItems = async (req, res) => {
  try {
    const allCarts = await Cart.findAll();
    console.log(allCarts);

    const cart = await Cart.findOne({
      where: { customerId: req.customer.id || req.query.c },
      include: [
        {
          model: Customer,
          attributes: ["fullName", "email", "phone", "balance"],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!cart) {
      return response.success(res, [], "Your cart is empty");
    }

    const cartItems = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product, attributes: ["name", "price"] }],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWW", cartItems);

    response.success(
      res,
      cartResponseFormat(cart.Customer, cartItems, allCarts), // Pass the customer object to the response format
      // cartResponseFormat(cartItems),
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
    const { cartId, productId } = req.query;

    if(!cartId) {
      response.badRequest(res, "Cart [__] must be provided ")
    }
    
    const deleted = await CartItem.destroy({
      where: { id, cartId },
    });
    
    
    if (!deleted) {
      return response.notFound(res, "Cart item not found");
    }
    
    const cartItems = await fetchCartItems(cartId)

    if(cartItems.length === 0) {
      const customer = Customer.findOne({
        id: req.customer.id
      })
      return response.success(res, cartResponseFormat(customer, []), "Cart is empty")
    }
    // get updated items using the cart id 
    // cart id must be provided 
    
    console.log("TEEEEEEEEEEEEEEEEEEEEEE", cartItems)
    response.success(
      res,
      cartResponseFormat(cartItems[0].Cart.Customer, cartItems),
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
      return response.notFound(res, "Cart not found");
    }

    response.success(res, [], "Cart cleared successfully");
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
