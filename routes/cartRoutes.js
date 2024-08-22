const express = require('express');
const router = express.Router();
const { getAllCartItems, getCartItemById, addToCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAllCartItems);
router.get('/:id', authMiddleware, getCartItemById);
router.post('/', authMiddleware, addToCart);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, deleteCartItem);

module.exports = router;
