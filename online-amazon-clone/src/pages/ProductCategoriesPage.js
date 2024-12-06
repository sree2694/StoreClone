/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductCategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        // Group products by category
        const grouped = data.products.reduce((acc, product) => {
          acc[product.category] = acc[product.category] || [];
          acc[product.category].push(product);
          return acc;
        }, {});
        setCategories(grouped);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>All Products by Category</h1>
      {Object.keys(categories).length > 0 ? (
        Object.entries(categories).map(([category, products]) => (
          <div key={category}>
            <h2>{category}</h2>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductCategoriesPage;
