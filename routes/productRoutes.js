const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, roleMiddleware(['admin']), createProduct);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteProduct);

module.exports = router;
