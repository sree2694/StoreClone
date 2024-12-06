import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    sort: '',
    currentPage: 1
  });

  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
  ];

  useEffect(() => {
    const query = new URLSearchParams(filters).toString();

    fetch(`http://localhost:5000/api/products?${query}`)
      .then((response) => response.json())
      .then((data) => {
        setFeaturedProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [filters]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div>
      <h1>Welcome to Amazon Clone</h1>

      <section className="categories">
        <h2>Shop by Categories</h2>
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <Link
                to={`/products/category/${category.name}`}
                onClick={() => setFilters((prev) => ({ ...prev, category: category.name }))}
              >
                <h3>{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="search-filter">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
        <select onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}>
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <select onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}>
          <option value="">Price Range</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="200-1000">$200+</option>
        </select>
      </section>

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

      <div className="pagination">
        <button
          disabled={filters.currentPage === 1}
          onClick={() => setFilters((prev) => ({ ...prev, currentPage: Math.max(prev.currentPage - 1, 1) }))}
        >
          Previous
        </button>
        <span>{filters.currentPage} of {totalPages}</span>
        <button
          disabled={filters.currentPage === totalPages}
          onClick={() => setFilters((prev) => ({ ...prev, currentPage: Math.min(prev.currentPage + 1, totalPages) }))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
