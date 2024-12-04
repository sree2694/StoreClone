// ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(response => setProduct(response.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Add to Cart</button>
      <button>Buy Now</button>
    </div>
  );
};

export default ProductDetailPage;
