/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';

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
        <Container>
            <Typography variant="h3" gutterBottom align="center">
                All Products by Category
            </Typography>

            {Object.keys(categories).length > 0 ? (
                Object.entries(categories).map(([category, products]) => (
                    <Box key={category} mb={4}>
                        <Typography variant="h4" gutterBottom>
                            {category}
                        </Typography>
                        <Grid container spacing={3}>
                            {products.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))
            ) : (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            )}
        </Container>
    );
};

export default ProductCategoriesPage;
