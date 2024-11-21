const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes'); // Import the category routes
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse incoming JSON requests

// Set up the route prefix
app.use('/api/categories', categoryRoutes); // All routes in categoryRoutes will be prefixed with /api/categories
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
