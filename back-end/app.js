const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the "public/images" folder
app.use('/images', express.static('public/images'));

// Example products data
const products = [
  { id: 1, name: 'Laptop', price: 100, category: 'Electronics', image: '/images/image1.jpg' },
  { id: 2, name: 'Smart phone', price: 200, category: 'Electronics', image: '/images/image2.jpg' },
  { id: 3, name: 'T-Shirt', price: 150, category: 'Clothing', image: '/images/image3.jpg' },
  { id: 4, name: 'C Programming Absolute Beginner`s Guide', price: 100, category: 'Books', image: '/images/books.jpg' },
];

// Fetch products by category
app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  res.json(filteredProducts);
});

app.get('/api/products/featured', (req, res) => {
  // Return first two as featured products (can be modified)
  const featuredProducts = products.slice(0, 4);
  res.json(featuredProducts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});