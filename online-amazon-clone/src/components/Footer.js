import React from 'react';
import { Box, Typography, Container, IconButton, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => (
    <Box
        component="footer"
        sx={{
            backgroundColor: '#333',
            color: '#fff',
            py: 4,
            mt: 'auto',
            textAlign: 'center',
        }}
    >
        <Container maxWidth="lg">
            {/* Main Footer Content */}
            <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 2 }}>
                &copy; {new Date().getFullYear()} Amazon Clone. All rights reserved.
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <IconButton color="inherit" href="https://facebook.com" target="_blank">
                    <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" href="https://twitter.com" target="_blank">
                    <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" href="https://instagram.com" target="_blank">
                    <InstagramIcon />
                </IconButton>
            </Box>

            {/* Quick Links Section */}
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={6} sm={4} md={2}>
                    <Typography variant="h6">Shop</Typography>
                    <Box>
                        <Link href="/products" color="inherit" sx={{ display: 'block' }}>Products</Link>
                        <Link href="/cart" color="inherit" sx={{ display: 'block' }}>Cart</Link>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <Typography variant="h6">About</Typography>
                    <Box>
                        <Link href="/about" color="inherit" sx={{ display: 'block' }}>About Us</Link>
                        <Link href="/contact" color="inherit" sx={{ display: 'block' }}>Contact</Link>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <Typography variant="h6">Help</Typography>
                    <Box>
                        <Link href="/faq" color="inherit" sx={{ display: 'block' }}>FAQ</Link>
                        <Link href="/support" color="inherit" sx={{ display: 'block' }}>Support</Link>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default Footer;
