import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
  ];

  useEffect(() => {
    // Fetch featured products from the backend
    fetch('http://localhost:5000/api/products/featured')
      .then((response) => response.json())
      .then((data) => setFeaturedProducts(data))
      .catch((error) => console.error('Error fetching featured products:', error));
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of products to display at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For tablets and smaller screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
        {featuredProducts.length > 0 ? (
          <Slider {...sliderSettings}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        ) : (
          <p>Loading featured products...</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;