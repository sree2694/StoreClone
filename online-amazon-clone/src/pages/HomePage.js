import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { debounce } from 'lodash';
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography
} from '@mui/material';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
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
    // Fetch products whenever filters change (including category)
    const query = new URLSearchParams(filters).toString();
    fetch(`http://localhost:5000/api/products?${query}&page=${filters.currentPage}`)
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

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  // Handle category change and reset the page to 1
  const handleCategoryChange = (categoryName) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryName,
      currentPage: 1 // Reset to first page when category changes
    }));
  };

  return (
      <Container>
        {/* <Typography variant="h3" gutterBottom align="center">
          Welcome to Amazon Clone
        </Typography> */}

        {/* Search Bar */}
        <Box display="flex" justifyContent="center" mb={3}>
          <TextField
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              sx={{ maxWidth: 600 }}
          />
        </Box>

        {/* Search Results */}
        <Box>
          <Grid container spacing={2}>
            {results.map((result) => (
                <Grid item key={result.id} xs={12} sm={6} md={4}>
                  <Typography>{result.name}</Typography>
                </Grid>
            ))}
          </Grid>
        </Box>

        {/* Categories Section */}
        <section className="categories">
          <Typography variant="h4" gutterBottom>
            Shop by Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
                <Grid item key={category.id} xs={12} sm={6} md={4}>
                  <Box
                      component={Link}
                      to={`/products/category/${category.name}`}
                      onClick={() => handleCategoryChange(category.name)} // Handle category click
                      sx={{
                        display: 'block',
                        p: 2,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 1,
                        textAlign: 'center',
                        '&:hover': {
                          backgroundColor: '#e0e0e0'
                        }
                      }}
                  >
                    <Typography variant="h6">{category.name}</Typography>
                  </Box>
                </Grid>
            ))}
          </Grid>
        </section>

        {/* Featured Products Section */}
        <section className="featured-products">
          <Typography variant="h4" gutterBottom>
            Featured Products
          </Typography>
          {featuredProducts.length > 0 ? (
              <Slider {...sliderSettings}>
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
              </Slider>
          ) : (
              <Typography>Loading featured products...</Typography>
          )}
        </section>

        {/* Pagination Section */}
        <Box display="flex" justifyContent="center" my={4}>
          <Button
              variant="contained"
              disabled={filters.currentPage === 1}
              onClick={() => setFilters((prev) => ({ ...prev, currentPage: Math.max(prev.currentPage - 1, 1) }))}
              sx={{ mr: 2 }}
          >
            Previous
          </Button>
          <Typography variant="body1">
            {filters.currentPage} of {totalPages}
          </Typography>
          <Button
              variant="contained"
              disabled={filters.currentPage === totalPages}
              onClick={() => setFilters((prev) => ({ ...prev, currentPage: Math.min(prev.currentPage + 1, totalPages) }))}
              sx={{ ml: 2 }}
          >
            Next
          </Button>
        </Box>
      </Container>
  );
};

export default HomePage;
