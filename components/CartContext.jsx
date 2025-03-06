'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on component mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cozycrochets-cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && cartItems.length > 0) {
      localStorage.setItem('cozycrochets-cart', JSON.stringify(cartItems));
    } else if (typeof window !== 'undefined' && cartItems.length === 0) {
      localStorage.removeItem('cozycrochets-cart');
    }
  }, [cartItems]);

  // Add an item to the cart with support for variants (color, size)
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      // Create a variant ID if color or size exists
      const variantId = (item.color || item.size) 
        ? `${item.id}-${item.color || ''}-${item.size || ''}` 
        : null;
      
      // Check if this exact item variant exists
      const existingItemIndex = prevItems.findIndex(i => 
        variantId 
          ? i.variantId === variantId 
          : i.id === item.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        return prevItems.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      
      // Add new item with variant info
      return [
        ...prevItems, 
        { 
          ...item, 
          variantId, 
          quantity: item.quantity || 1 
        }
      ];
    });
  };

  // Remove item from cart (supporting variant IDs)
  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => 
      (item.variantId || item.id) !== itemId
    ));
  };

  // Update item quantity
  const updateItemQuantity = (itemId, quantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.variantId || item.id) === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Remove from cart - keeping the original method name for backward compatibility
  const removeFromCart = (itemId) => {
    removeItemFromCart(itemId);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cozycrochets-cart');
    }
  };

  // Add customization to an item
  const addCustomizationToItem = (itemId, customization) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if ((item.variantId || item.id) === itemId) {
          const existingCustomizations = item.customizations || [];
          return {
            ...item,
            customizations: [...existingCustomizations, customization]
          };
        }
        return item;
      })
    );
  };

  // Remove customization from an item
  const removeCustomizationFromItem = (itemId, customizationId) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if ((item.variantId || item.id) === itemId && item.customizations) {
          return {
            ...item,
            customizations: item.customizations.filter(
              custom => custom.id !== customizationId
            )
          };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addItemToCart,  // Original method
        removeItemFromCart,  // Original method
        removeFromCart,  // Alias for compatibility with new cart component
        updateItemQuantity,  // New method
        clearCart,
        addCustomizationToItem,  // New method
        removeCustomizationFromItem  // New method
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier access
export const useCart = () => useContext(CartContext);