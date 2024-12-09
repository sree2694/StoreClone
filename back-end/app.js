const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Mock Cart Data
let cart = [];

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
  const pageNumber = req.query.page ? parseInt(req.query.page, 10) : 1; // Default to page 1 if not provided
  const perPage = 10; // Number of products per page

  // Filter products by category
  let filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());

  // Log to debug filtered products
  console.log(`Filtered products for category ${category}:`, filteredProducts);

  // Calculate total pages dynamically based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  // Log to debug totalPages calculation
  console.log(`Total pages: ${totalPages}`);

  // Paginate filtered products
  const paginatedProducts = filteredProducts.slice((pageNumber - 1) * perPage, pageNumber * perPage);

  // Log to debug paginated products
  console.log(`Paginated products for page ${pageNumber}:`, paginatedProducts);

  // Return response with paginated products and total pages
  res.json({
    products: paginatedProducts,
    totalPages: totalPages, // Return totalPages
  });
});


// Get products with filters, sorting, and pagination
app.get('/api/products', (req, res) => {
  let filteredProducts = products;

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
    filteredProducts = filteredProducts.filter((product) => {
      if (!max) return product.price >= min; // Open-ended range support
      return product.price >= min && product.price <= max;
    });
  }

  if (sort === 'price-asc') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  const perPage = 10;
  const pageNumber = page ? parseInt(page, 10) : 1;
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  filteredProducts = filteredProducts.slice((pageNumber - 1) * perPage, pageNumber * perPage);

  res.json({
    products: filteredProducts,
    totalPages,
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
  const product = products.find((p) => p.id === parseInt(id));
  if (product) {
    const relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    );
    res.json(relatedProducts);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


// Fetch cart items
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post('/api/cart', express.json(), (req, res) => {
  const { id, quantity } = req.body;
  const product = products.find((p) => p.id === id);
  if (product) {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    res.status(200).json({ message: 'Item added to cart' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


// Update quantity or remove from cart
app.put('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  cart = cart.map((item) =>
      item.id === parseInt(id, 10) ? { ...item, quantity: parseInt(quantity, 10) } : item
  ).filter((item) => item.quantity > 0);

  res.json(cart);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
