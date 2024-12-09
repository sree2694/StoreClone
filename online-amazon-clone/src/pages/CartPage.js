import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { fetchCart } from '../services/api'; // Import fetchCart API function

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        fetchCart()
            .then((response) => {
                setCartItems(response.data);
                calculateTotal(response.data);
            })
            .catch((error) => console.error('Error fetching cart:', error));
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalCost(total);
    };

    const updateQuantity = (id, quantity) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: parseInt(quantity) || 1 } : item
        );
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                        />
                    ))}
                    <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
                    <button onClick={() => window.location.href = '/checkout'}>Proceed to Checkout</button>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
