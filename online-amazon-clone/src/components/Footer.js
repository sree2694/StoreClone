import React from 'react';
import { Box, Typography, Container, IconButton, Grid, Link, TextField, Button } from '@mui/material';
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
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
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
                <Grid item xs={6} sm={4} md={2}>
                    <Typography variant="h6">Legal</Typography>
                    <Box>
                        <Link href="/privacy-policy" color="inherit" sx={{ display: 'block' }}>Privacy Policy</Link>
                        <Link href="/terms" color="inherit" sx={{ display: 'block' }}>Terms of Service</Link>
                    </Box>
                </Grid>
            </Grid>

            {/* Contact Information */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>Contact Us</Typography>
                <Typography variant="body2">123 E-commerce St., Shopping City, SC 45678</Typography>
                <Typography variant="body2">Phone: (123) 456-7890</Typography>
                <Typography variant="body2">Email: support@amazonclone.com</Typography>
            </Box>

            {/* Email Sign-Up Form */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <TextField
                    variant="outlined"
                    placeholder="Enter your email"
                    size="small"
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                />
                <Button variant="contained" color="primary">
                    Sign Up
                </Button>
            </Box>
        </Container>
    </Box>
);

export default Footer;
