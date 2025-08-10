import Category from '../models/category.model.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "eshop_categories" }, (error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    
    const uploadResult = await streamUpload(req);

    const category = new Category({
      name,
      image: {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      },
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating category' });
  }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            // Delete image from Cloudinary
            await cloudinary.uploader.destroy(category.image.public_id);
            // Delete category from DB
            await Category.deleteOne({ _id: category._id });
            res.status(200).json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error deleting category' });
    }
};

export const getCategoryByName = async (req, res) => {
  try {
    // Find category by name, making it case-insensitive
    const category = await Category.findOne({ 
      name: { $regex: new RegExp(`^${req.params.name}$`, 'i') } 
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};