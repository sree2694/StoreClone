const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to enable CORS
app.use(cors());

// Serve static files
app.use('/images', express.static('public/images'));

// Example product data
const products = [
  { id: 1, name: 'Laptop', price: 100, category: 'Electronics', image: '/images/image1.jpg' },
  { id: 2, name: 'Smartphone', price: 200, category: 'Electronics', image: '/images/image2.jpg' },
  { id: 3, name: 'T-Shirt', price: 150, category: 'Clothing', image: '/images/image3.jpg' },
  { id: 4, name: 'C Programming Absolute Beginner`s Guide', price: 100, category: 'Books', image: '/images/books.jpg' },
];

// Fetch products by category
app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  res.json(filteredProducts);
});

// Get products with filters, sorting, and pagination
app.get('/api/products', (req, res) => {
  let filteredProducts = products;

  // Filters and search
  const { search, category, priceRange, sort, page } = req.query;

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  // Sorting
  if (sort === 'price-asc') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const perPage = 10;
  const pageNumber = page ? parseInt(page, 10) : 1;
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  filteredProducts = filteredProducts.slice((pageNumber - 1) * perPage, pageNumber * perPage);

  res.json({
    products: filteredProducts,
    totalPages,
    products
  });
});
// Fetch product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id, 10));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Route to fetch related products
app.get('/api/products/:id/related', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Find products in the same category (excluding the current product)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  res.json(relatedProducts);
});


app.listen(port, () => console.log(`Server running on port ${port}`));
