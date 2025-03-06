'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { ShoppingBag, X } from 'lucide-react';

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Mock function to create an invoice
  const handleMakeOrder = () => {
    console.log('Creating invoice...');
    // Replace with real invoice generation and sending logic as needed.
    alert('Invoice created (mock)');
    // clearCart();
    setIsOpen(false);
  };

  return (
    <div>
      {/* Floating Cart Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <ShoppingBag size={20} />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} <span className="text-sm"> (x{item.quantity})</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6">
              <button
                onClick={handleMakeOrder}
                disabled={cartItems.length === 0}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                Make order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
