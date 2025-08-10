import cloudinary from "../config/cloudinary.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import streamifier from "streamifier";

export const getProducts = async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    // Build the query object for filtering
    const query = {};
    if (req.query.keyword) {
      query.name = { $regex: req.query.keyword, $options: "i" }; // Case-insensitive search
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    const count = await Product.countDocuments(query);

    // Find the products for the current page
    const products = await Product.find(query)
      .populate("category", "name")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Send back products along with pagination data
    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, brand, category, countInStock } =
      req.body;

    if (!req.file) {
      res.status(400);
      throw new Error("No image file uploaded.");
    }

    // --- Upload image to Cloudinary ---
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "eshop_products" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const uploadResult = await streamUpload(req);

    // --- Create Product in Database ---
    const product = new Product({
      name,
      price,
      user: req.user._id,
      brand,
      category,
      countInStock,
      description,
      image: {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      },
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Server error creating product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Server error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    // First, find the category by name to get its ID
    const category = await Category.findOne({ 
      name: { $regex: new RegExp(`^${req.params.categoryName}$`, 'i') } 
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Then, find all products that have that category ID
    const products = await Product.find({ category: category._id }).populate('category', 'name');
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    res.status(500).json({ message: 'Server error fetching products by category' });
  }
};