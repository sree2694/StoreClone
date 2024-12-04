// CheckoutPage.js
import React, { useState } from 'react';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    console.log('Address:', address);
    console.log('Redirecting to payment gateway...');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <textarea
        placeholder="Enter your shipping address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <button onClick={handleCheckout}>Pay with Stripe</button>
    </div>
  );
};

export default CheckoutPage;
