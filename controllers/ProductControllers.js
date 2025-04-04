const Product = require("../models/Product");
const response = require("../utils/response");
const { where, Op } = require("sequelize");

const getProducts = async (req, res) => {
  try {
    
    const products = await Product.findAll();
    response.created(res, products, "Products fetched successfully");
  } catch (error) {
    console.error("Error fetching products:", error);
    response.error(res, error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stockQuantity } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      price,
      stockQuantity,
    });

    response.created(res, product);
  } catch (error) {
    console.error("Error creating product:", error);
    response.error(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [updated] = await Product.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return response.notFound(res, "Product not found");
    }
    
    const updatedProduct = await Product.findByPk(id);
    response.success(res, updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    response.error(res, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({
      where: { id },
    });

    if (!deleted) {
      return response.notFound(res, "Product not found");
    }
    response.success(res, "Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    response.error(res, error.message);
  }
};

const setPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    console.log("------------------------");
    console.log(id, price);
    const product = await Product.findByPk(id);
    if (!product) {
      return response.notFound(res, "Product not found");
    }

    product.price = price;
    await product.save();

    response.success(res, product);
  } catch (error) {
    console.error("Error setting product price:", error);
    response.error(res, error.message);
  }
}
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return response.notFound(res, "Product not found");
    }
    response.success(res, product);
  } catch (error) {
    console.error("Error fetching product:", error);
    response.error(res, error.message);
  }
}
const getProductsByName = async (req, res) => {
  try {
    console.log(req.query)
    const { name } = req.query;

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (!products.length) {
      return response.notFound(res, "No products found");
    }
    response.success(res, products);
  } catch (error) {
    console.error("Error fetching products:", error);
    response.error(res, error.message);
  }
}

const sampleProducts = async (req, res) => {
  const books = require("../utils/sampleData");

  await Product.bulkCreate(books)
    .then(() => {
      console.log("Sample products created successfully");
      response.success(res, "Sample products created successfully");
    })
    .catch((error) => {
      console.error("Error creating sample products:", error);
      response.error(res, "Failed to create sample products");
    });

  response.success(res, sampleData);
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  sampleProducts,
  getProductById,
  getProductsByName,
  setPrice,
};
