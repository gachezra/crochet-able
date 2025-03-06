'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { ShoppingBag, X, Plus, Minus, Mail, Download } from 'lucide-react';

const Invoice = ({ items, total, onClose }) => {
  const today = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  
  // Mock function to send invoice via email
  const sendInvoiceByEmail = () => {
    console.log('Sending invoice to customer and owner');
    alert('Invoice sent to customer and hello@cozycrochets.com');
  };
  
  // Mock function to download invoice as PDF
  const downloadInvoice = () => {
    console.log('Downloading invoice as PDF');
    alert('Invoice downloaded');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gray-700 font-bold">Invoice</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            <span className="text-blue-500">Cozy</span>
            <span className="text-white bg-blue-500 px-1">Crochets</span>
          </h1>
          <p className="text-center text-gray-600">Handmade with love, perfect for your home</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
          <div>
            <p className="font-bold">Invoice Number:</p>
            <p>{invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Date:</p>
            <p>{today}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-700 mb-6 min-w-[500px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-center py-2">Quantity</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <React.Fragment key={item.variantId || item.id}>
                  <tr className="border-b">
                    <td className="py-2">
                      <div className="font-medium">{item.name}</div>
                      {(item.color || item.size) && (
                        <div className="text-sm text-gray-600">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.color && item.size && <span> | </span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                      )}
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">${item.price.toFixed(2)}</td>
                    <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                  {item.customizations && item.customizations.map((custom, idx) => (
                    <tr 
                      key={`${item.variantId || item.id}-custom-${idx}`} 
                      className="text-sm text-gray-600 border-b"
                    >
                      <td className="py-1 pl-4">+ {custom.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">${custom.price.toFixed(2)}</td>
                      <td className="text-right">${(custom.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-gray-700 text-xl font-bold">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 justify-between">
          <button 
            onClick={onClose} 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
          <div className="flex gap-2">
            <button 
              onClick={downloadInvoice} 
              className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <Download size={18} />
              Download
            </button>
            <button 
              onClick={sendInvoiceByEmail} 
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <Mail size={18} />
              Email Invoice
            </button>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>Thank you for shopping at CozyCrochets!</p>
          <p className="text-sm">
            For any inquiries, please contact hello@cozycrochets.com
          </p>
        </div>
      </div>
    </div>
  );
};

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
                          <div className="text-sm text-gray-600 mt-1">${item.price.toFixed(2)} each</div>
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
                              <span>${custom.price.toFixed(2)}</span>
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
                          ${itemTotal.toFixed(2)}
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
                <span>${totalAmount.toFixed(2)}</span>
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

      {/* Invoice */}
      {showInvoice && (
        <Invoice 
          items={cartItems} 
          total={totalAmount} 
          onClose={closeInvoice} 
        />
      )}
    </div>
  );
};

export default Cart;