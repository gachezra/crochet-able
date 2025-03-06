'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import SharedInvoice from './SharedInvoice';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  
  // Calculate total including any customizations
  const totalAmount = cartItems.reduce((total, item) => {
    let itemTotal = item.price * item.quantity;
    
    if (item.customizations) {
      itemTotal += item.customizations.reduce(
        (customTotal, custom) => customTotal + (custom.price * item.quantity),
        0
      );
    }
    
    return total + itemTotal;
  }, 0);

  const handleMakeOrder = () => {
    setShowInvoice(true);
  };
  
  const closeInvoice = () => {
    setShowInvoice(false);
    clearCart();
    setIsOpen(false);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.variantId || item.id);
    } else {
      updateItemQuantity(item.variantId || item.id, newQuantity);
    }
  };
  
  // Get total number of items (accounting for quantities)
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div>
      {/* Floating Cart Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-40"
      >
        <ShoppingBag size={20} />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-pink-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3 p-6 relative max-h-[90vh] overflow-y-auto">
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
                {cartItems.map((item) => {
                  // Calculate item total including customizations
                  let itemTotal = item.price * item.quantity;
                  if (item.customizations) {
                    itemTotal += item.customizations.reduce(
                      (customTotal, custom) => customTotal + (custom.price * item.quantity),
                      0
                    );
                  }
                  
                  return (
                    <li key={item.variantId || item.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          {(item.color || item.size) && (
                            <div className="text-sm text-gray-600">
                              {item.color && <span>Color: {item.color}</span>}
                              {item.color && item.size && <span> | </span>}
                              {item.size && <span>Size: {item.size}</span>}
                            </div>
                          )}
                          <div className="text-sm text-gray-600 mt-1">₪{item.price.toFixed(2)} each</div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.variantId || item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      {item.customizations && (
                        <div className="ml-4 mt-1 mb-2 text-sm text-gray-600">
                          {item.customizations.map((custom, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>+ {custom.name}</span>
                              <span>₪{custom.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-2 pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="font-medium">
                          ₪{itemTotal.toFixed(2)}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₪{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleMakeOrder}
                disabled={cartItems.length === 0}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice - Using Shared Component */}
      {showInvoice && (
        <SharedInvoice 
          items={cartItems} 
          total={totalAmount}
          onClose={closeInvoice}
          isModal={true}
        />
      )}
    </div>
  );
};

export default Cart;