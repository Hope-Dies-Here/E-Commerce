const supabase = require("../config/database");
const response = require("../utils/response");

const getProducts = async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      return response.error(res, "Error fetching products");
    }

    response.created(res, products, "Products fetched successfully");
  } catch (error) {
    console.error("Error fetching products:", error);
    response.error(res, error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stockQuantity } = req.body;

    const { data: product, error } = await supabase.from("products").insert([
      {
        name,
        price,
        description,
        stockQuantity,
      },
    ]);

    if (error) {
      return response.error(res, "Error creating product");
    }

    response.created(res, product);
  } catch (error) {
    console.error("Error creating product:", error);
    response.error(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stockQuantity } = req.body;

    const { data, error } = await supabase
      .from("products")
      .update({ name, price, description, stockQuantity })
      .eq("id", id);

    if (error) {
      return response.error(res, "Error updating product");
    }

    const { data: updatedProduct, error: productError } = await supabase
      .from("products")
      .select("*");

    if (productError) {
      return response.error(res, "Error fetching updated product");
    }

    response.success(res, updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    response.error(res, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return response.error(res, "Error deleting product");
    }

    if (!data.length) {
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

    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update({ price })
      .eq("id", id);

    if (error) {
      return response.error(res, "Error updating product price");
    }

    if (!updatedProduct.length) {
      return response.notFound(res, "Product not found");
    }

    response.success(res, updatedProduct[0]);
  } catch (error) {
    console.error("Error setting product price:", error);
    response.error(res, error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      return response.error(res, "Error fetching product");
    }

    if (!product) {
      return response.notFound(res, "Product not found");
    }

    response.success(res, product);
  } catch (error) {
    console.error("Error fetching product:", error);
    response.error(res, error.message);
  }
};

const getProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${name}%`);

    if (error && error.code !== "PGRST116") {
      return response.error(res, "Error fetching products by name");
    }

    if (!products.length) {
      return response.notFound(res, "No products found");
    }

    response.success(res, products);
  } catch (error) {
    console.error("Error fetching products:", error);
    response.error(res, error.message);
  }
};

const sampleProducts = async (req, res) => {
  const { products: sampleProducts } = require("../utils/sampleData");

  try {
    const { data, error } = await supabase
      .from("products")
      .insert(sampleProducts);

    if (error) {
      return response.error(res, "Error creating sample products");
    }

    response.success(res, "Sample products created successfully");
  } catch (error) {
    console.error("Error creating sample products:", error);
    response.error(res, "Failed to create sample products");
  }
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
