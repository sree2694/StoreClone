import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Box, Typography, Grid, CircularProgress, Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const ProductListingPage = () => {
    const { category } = useParams(); // Get the category from the URL
    const [products, setProducts] = useState([]); // Initialize products as an empty array
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/products/category/${category}?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data.products || []); // Safely set products to an empty array if undefined
                setTotalPages(data.totalPages || 0); // Default to 0 if totalPages is undefined
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                {category} Products
            </Typography>
            <Grid container spacing={1}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No products found for this category.
                    </Typography>
                )}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default ProductListingPage;
