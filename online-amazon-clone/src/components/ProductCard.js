import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const ProductCard = ({ product }) => (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
            component="img"
            alt={product.name}
            height="200"
            image={`http://localhost:5000${product.image}`}
            sx={{ objectFit: 'contain' }}
        />
        <CardContent>
            <Typography variant="h6" gutterBottom>
                {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Rating: {product.rating} ⭐
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
        </CardContent>
        <Box p={2}>
            <Link to={`/products/${product.id}`}>
                <Button variant="contained" fullWidth color="primary">
                    View Details
                </Button>
            </Link>
        </Box>
    </Card>
);

export default ProductCard;
