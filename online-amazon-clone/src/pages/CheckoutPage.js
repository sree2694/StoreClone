import React, { useState } from 'react';

const CheckoutPage = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform shipping address validation
        if (!address || !city || !state || !zip) {
            alert('Please fill out all shipping details.');
            return;
        }

        setPaymentProcessing(true);

        // Simulate payment gateway integration
        setTimeout(() => {
            alert('Payment successful! Thank you for your purchase.');
            setPaymentProcessing(false);
            window.location.href = '/';
        }, 3000); // Simulate 3 seconds for payment processing
    };

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <h2>Shipping Address</h2>
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    ZIP Code:
                    <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                    />
                </label>

                <h2>Payment</h2>
                <p>Integrate your payment gateway here (e.g., Stripe, Razorpay, etc.).</p>
                <button type="submit" disabled={paymentProcessing}>
                    {paymentProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
