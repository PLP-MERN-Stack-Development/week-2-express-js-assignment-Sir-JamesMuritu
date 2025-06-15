const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const Product = require('../models/Product');

// GET /api/products (with filtering, pagination, search)
router.get('/', productsController.getProducts);
// GET /api/products/:id
router.get('/:id', productsController.getProductById);
// POST /api/products
router.post('/', validation, productsController.createProduct);
// PUT /api/products/:id
router.put('/:id', validation, productsController.updateProduct);
// DELETE /api/products/:id
router.delete('/:id', auth, productsController.deleteProduct);
// GET /api/products/search?name=foo
router.get('/search', productsController.searchProducts);
// GET /api/products/stats
router.get('/stats', productsController.getProductStats);

// Create a new product (for testing purposes)
router.post('/api/product', validation, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;