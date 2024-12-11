import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';

const AboutUsPage = () => {
    return (
        <Container sx={{ py: 4 }}>
            {/* Header Section */}
            <Box textAlign="center" mb={4}>
                <Typography variant="h3" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Learn more about our mission, values, and the team that makes everything possible.
                </Typography>
            </Box>

            {/* About Section */}
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                    Who We Are
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    We are a dedicated team of professionals committed to delivering high-quality products and exceptional service. Our mission is to provide a seamless shopping experience while upholding the highest standards of quality and customer satisfaction.
                </Typography>
            </Box>

            {/* Team Section */}
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                    Meet Our Team
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box textAlign="center">
                            <img
                                src={require('../assets/images/team-member-1.jpg')}
                                alt="Team Member 1"
                                style={{ width: '100%', borderRadius: '50%' }}
                            />
                            <Typography variant="h6" mt={2}>
                                John Doe
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                CEO & Founder
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box textAlign="center">
                            <img
                                src={require('../assets/images/team-member-2.jpg')}
                                alt="Team Member 2"
                                style={{ width: '100%', borderRadius: '50%' }}
                            />
                            <Typography variant="h6" mt={2}>
                                Jane Smith
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Head of Marketing
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box textAlign="center">
                            <img
                                src={require('../assets/images/team-member-3.jpg')}
                                alt="Team Member 3"
                                style={{ width: '100%', borderRadius: '50%' }}
                            />
                            <Typography variant="h6" mt={2}>
                                Alex Brown
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lead Developer
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Contact Section */}
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                    Have questions? Reach out to us!
                </Typography>
                <Typography variant="body2">
                    <strong>Email:</strong> contact@company.com
                </Typography>
                <Typography variant="body2">
                    <strong>Phone:</strong> +1 123 456 7890
                </Typography>
            </Box>

            {/* Policies Section */}
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                    Our Policies
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    We believe in transparency and fairness. Explore our policies to understand how we operate.
                </Typography>
                <Button href="/shipping-policy" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
                    Shipping Policy
                </Button>
                <Button href="/privacy-policy" variant="outlined" color="primary" sx={{ mt: 2 }}>
                    Privacy Policy
                </Button>
            </Box>

            {/* Social Media Links */}
            <Box textAlign="center" mt={4}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Follow us on social media:
                </Typography>
                <Button href="#" color="primary" sx={{ mx: 1 }}>
                    Facebook
                </Button>
                <Button href="#" color="primary" sx={{ mx: 1 }}>
                    Twitter
                </Button>
                <Button href="#" color="primary" sx={{ mx: 1 }}>
                    Instagram
                </Button>
            </Box>
        </Container>
    );
};

export default AboutUsPage;
