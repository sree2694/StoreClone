const express = require('express')
const app = express()
const port = 5000

// Example data for products
const products = [
  { id: 1, name: 'Product 1', price: 100, category: 'Electronics', image: '/images/image1.jpg' },
  { id: 2, name: 'Product 2', price: 200, category: 'Clothing', image: '/images/image2.jpg' },
  { id: 3, name: 'Product 3', price: 150, category: 'Books', image: '/images/image3.jpg' },
];

// Fetch products by category
app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  res.json(filteredProducts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

