// CartPage.js
import React from 'react';
import CartItem from '../components/CartItem';

const CartPage = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <h2>Total: ${total}</h2>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
