import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem }) => (
  <div className="cart-item">
    <img src={item.image} alt={item.name} />
    <h4>{item.name}</h4>
    <p>${item.price}</p>
    <input
      type="number"
      value={item.quantity}
      onChange={(e) => updateQuantity(item.id, e.target.value)}
    />
    <button onClick={() => removeItem(item.id)}>Remove</button>
  </div>
);

export default CartItem;
