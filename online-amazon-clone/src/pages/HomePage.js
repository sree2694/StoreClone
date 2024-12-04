// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';

const HomePage = () => {
  const featuredProducts = [
    { id: 1, name: 'Product 1', price: 100, image: image1, category: 'Electronics' },
    { id: 2, name: 'Product 2', price: 200, image: image2, category: 'Clothing' },
  ];

  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
  ];

  return (
    <div>
      <h1>Welcome to Amazon Clone</h1>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Categories</h2>
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <Link to={`/products/category/${category.name}`}>
                <h3>{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
