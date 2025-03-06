'use client';

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add an item (with name, price, quantity, etc.) to the cart
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists (you could also update quantity)
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier access
export const useCart = () => useContext(CartContext);
