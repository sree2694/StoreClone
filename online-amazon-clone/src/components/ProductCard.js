import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={`http://localhost:5000${product.image}`} alt={product.name} />
    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <p>Rating: {product.rating} ⭐</p>
    <p>Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
    <Link to={`/products/${product.id}`}>
      <button>View Details</button>
    </Link>
  </div>
);

export default ProductCard;
