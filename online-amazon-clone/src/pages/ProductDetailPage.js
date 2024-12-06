import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    console.log('Product ID:', id);
    axios.get(`http://localhost:5000/api/products/${id}`, { timeout: 5000 }).then((response) => setProduct(response.data))
    .catch((error) => console.error('Error fetching product:', error));
    axios.get(`http://localhost:5000/api/products/${id}/related`, { timeout: 5000 }).then((response) => setRelatedProducts(response.data))
    .catch((error) => console.error('Error fetching related products:', error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={`http://localhost:5000${product.image}`} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating} ⭐</p>
      <p>Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
      <button>Add to Cart</button>
      <button>Buy Now</button>

      <h2>Related Products</h2>
      <div className="related-products">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
