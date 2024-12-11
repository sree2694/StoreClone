import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Breadcrumbs,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Products", path: "/products" },
    { text: "Cart", path: "/cart" },
    { text: "About us", path: "/about" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#333" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo or Brand */}
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              StoreClone
            </Link>
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.text}
                component={Link}
                to={link.path}
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  borderBottom: link.text === "Home" ? "2px solid #fff" : "none",
                }}
              >
                {link.text}
              </Button>
            ))}
          </Box>

          {/* Hamburger Menu for Mobile */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      {!isMobile && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ margin: 2 }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Typography color="text.primary">Current Page</Typography>
        </Breadcrumbs>
      )}

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
