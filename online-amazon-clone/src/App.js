import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductCategoriesPage from './pages/ProductCategoriesPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ErrorBoundary from "./services/ErrorBoundary";
import AboutUsPage from './pages/About';

const App = () => (
    <ErrorBoundary>
  <Router>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductCategoriesPage />} />
        <Route path="/products/category/:category" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutUsPage/>} />
      </Routes>
    </main>
    <Footer />
  </Router>
    </ErrorBoundary>
);

export default App;
