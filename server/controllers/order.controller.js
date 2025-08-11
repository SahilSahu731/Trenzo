import Order from '../models/order.model.js';
import User from '../models/user.model.js';

export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    const order = new Order({
      orderItems: orderItems.map(x => ({
        ...x,
        product: x._id, // Map product ID from cart item
        _id: undefined // Remove original product ID from item
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    
    // After creating the order, clear the user's cart
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};
// would add other controllers here like getMyOrders, getOrderById, etc.