import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const navLinks = [
        { text: 'Home', path: '/' },
        { text: 'Products', path: '/products' },
        { text: 'Cart', path: '/cart' },
    ];

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#333' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo or Brand */}
                    <Typography variant="h6" component="div">
                        MyStore
                    </Typography>

                    {/* Desktop Links */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                        {navLinks.map((link) => (
                            <Button key={link.text} component={Link} to={link.path} color="inherit">
                                {link.text}
                            </Button>
                        ))}
                    </Box>

                    {/* Hamburger Menu for Mobile */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {navLinks.map((link) => (
                            <ListItem button key={link.text} component={Link} to={link.path}>
                                <ListItemText primary={link.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
