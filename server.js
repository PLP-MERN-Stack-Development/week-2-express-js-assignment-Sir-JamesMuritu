// Import required modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/products');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB (if using a database, otherwise this can be skipped)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Mount product routes
app.use('/api/products', productRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
