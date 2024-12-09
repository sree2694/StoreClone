import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Box, Button, Typography, Grid, Paper, CardMedia } from '@mui/material';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        console.log('Product ID:', id);
        axios.get(`http://localhost:5000/api/products/${id}`, { timeout: 5000 })
            .then((response) => setProduct(response.data))
            .catch((error) => console.error('Error fetching product:', error));

        axios.get(`http://localhost:5000/api/products/${id}/related`, { timeout: 5000 })
            .then((response) => setRelatedProducts(response.data))
            .catch((error) => console.error('Error fetching related products:', error));
    }, [id]);

    if (!product) return <Typography variant="h6">Loading...</Typography>;

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                {/* Product Info */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="400"
                            image={`http://localhost:5000${product.image}`}
                            sx={{ objectFit: 'contain' }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h4">{product.name}</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="h6" color="primary">Price: ${product.price}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rating: {product.rating} ⭐
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Typography>

                        <Box sx={{ marginTop: 2 }}>
                            <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
                                Add to Cart
                            </Button>
                            <Button variant="outlined" color="secondary" fullWidth>
                                Buy Now
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Related Products Section */}
            <Box sx={{ marginTop: 5 }}>
                <Typography variant="h5" gutterBottom>Related Products</Typography>
                <Grid container spacing={3}>
                    {relatedProducts.map((relatedProduct) => (
                        <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
                            <ProductCard product={relatedProduct} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductDetailPage;
