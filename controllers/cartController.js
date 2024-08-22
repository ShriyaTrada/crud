const { Cart, Product, User } = require('../models');

// Get all cart items for the current user
exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { UserId: req.user.id }, include: [Product] });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

// Get a single cart item by ID
exports.getCartItemById = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ where: { id: req.params.id, UserId: req.user.id }, include: [Product] });
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart item' });
  }
};

// Add a product to the cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await Cart.create({ UserId: req.user.id, ProductId: productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add to cart' });
  }
};

// Update cart item (quantity)
exports.updateCartItem = async (req, res) => {
  try {
    const [updated] = await Cart.update(req.body, { where: { id: req.params.id, UserId: req.user.id } });
    if (!updated) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Cart item updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const deleted = await Cart.destroy({ where: { id: req.params.id, UserId: req.user.id } });
    if (!deleted) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Cart item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
};
