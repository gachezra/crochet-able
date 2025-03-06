// SharedInvoice.jsx
'use client';

import React from 'react';
import { Mail, Download, X } from 'lucide-react';

const SharedInvoice = ({ 
  items, 
  total, 
  onClose, 
  isModal = true, 
  customerInfo = null,
  tax = 0,
  shipping = 0,
  orderPlaced = false
}) => {
  const today = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  
  // Calculate final total including tax and shipping
  const finalTotal = total + tax + shipping;
  
  // Mock function to send invoice via email
  const sendInvoiceByEmail = () => {
    console.log('Sending invoice to customer and hello@cozycrochets.com');
    alert('Invoice sent to customer and hello@cozycrochets.com');
  };
  
  // Mock function to download invoice as PDF
  const downloadInvoice = () => {
    console.log('Downloading invoice as PDF');
    alert('Invoice downloaded');
  };
  
  // Determine if we should show a modal or inline component
  const containerClass = isModal
    ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    : "w-full";
    
  return (
    <div className={containerClass}>
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header with Close button if in modal mode */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gray-700 font-bold">
            {orderPlaced ? "Order Confirmation" : "Invoice"}
          </h2>
          {isModal && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          )}
        </div>
        
        {/* Brand Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            <span className="text-blue-500">Cozy</span>
            <span className="text-white bg-blue-500 px-1">Crochets</span>
          </h1>
          <p className="text-center text-gray-600">Handmade with love, perfect for your home</p>
        </div>
        
        {/* Invoice Info */}
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
        
        {/* Customer Info Section (if provided) */}
        {customerInfo && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">Customer Information</h3>
            <p>{customerInfo.firstName} {customerInfo.lastName}</p>
            <p>{customerInfo.email}</p>
            <p>{customerInfo.phone}</p>
            
            <h3 className="font-bold mt-4 mb-2">Shipping Address</h3>
            <p>{customerInfo.address}</p>
            <p>{customerInfo.city}, {customerInfo.state} {customerInfo.zip}</p>
            <p>{customerInfo.country}</p>
            
            {customerInfo.notes && (
              <>
                <h3 className="font-bold mt-4 mb-2">Order Notes</h3>
                <p>{customerInfo.notes}</p>
              </>
            )}
          </div>
        )}
        
        {/* Items Table */}
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
                    <td className="text-right">₪{item.price.toFixed(2)}</td>
                    <td className="text-right">₪{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                  {item.customizations && item.customizations.map((custom, idx) => (
                    <tr 
                      key={`${item.variantId || item.id}-custom-${idx}`} 
                      className="text-sm text-gray-600 border-b"
                    >
                      <td className="py-1 pl-4">+ {custom.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">₪{custom.price.toFixed(2)}</td>
                      <td className="text-right">₪{(custom.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Totals Section */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>₪{total.toFixed(2)}</span>
            </div>
            
            {tax > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span>₪{tax.toFixed(2)}</span>
              </div>
            )}
            
            {shipping > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span>₪{shipping.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-700 text-xl font-bold pt-2 border-t mt-2">
              <span>Total Amount:</span>
              <span>₪{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-2 justify-between">
          {isModal ? (
            <button 
              onClick={onClose} 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          ) : (
            <div></div>
          )}
          
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
        
        {/* Footer */}
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

export default SharedInvoice;