const NotFoundError = require('../errors/NotFoundError');
const validationError = require('../errors/validationError');
const Product = require('../models/Product');

// GET /api/products (with filtering, pagination, category)
exports.getProducts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category ? { category } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new NotFoundError('Product not found'));
    res.json(product);
  } catch (err) {
    next(err);
  }
};


// POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = new Product({ name, description, price, category, inStock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(new validationError(err.message));
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, inStock },
      { new: true, runValidators: true }
    );
    if (!updated) return next(new NotFoundError('Product not found'));
    res.json(updated);
  } catch (err) {
    next(new validationError(err.message));
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new NotFoundError('Product not found'));
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/search?name=foo
exports.searchProducts = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return res.json([]);
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/stats
exports.getProductStats = async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};