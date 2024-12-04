// ProductListingPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductListingPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the category
    fetch(`http://localhost:5000/api/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [category]);

  return (
    <div>
      <h1>{category} Products</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
  