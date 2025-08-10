import User from '../models/user.model.js';

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (user) {
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      const existItem = user.cart.find(
        (item) => item.product.toString() === productId
      );

      if (existItem) {
        existItem.qty = qty;
      } else {
        user.cart.push({ product: productId, qty });
      }

      await user.save();
      const updatedUser = await User.findById(req.user._id).populate('cart.product');
      res.status(200).json(updatedUser.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (user) {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
      await user.save();
      const updatedUser = await User.findById(req.user._id).populate('cart.product');
      res.status(200).json(updatedUser.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};