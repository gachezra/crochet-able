"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useParams } from "next/navigation";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Check } from 'lucide-react';
import SharedInvoice from '@/components/SharedInvoice';

// Mock data for crochet items (same as in app/page.js)
const crochetItems = [
  {
    id: 1,
    name: 'Cozy Blanket',
    price: 45.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'A beautiful handmade blanket perfect for chilly evenings.',
    accent: 'pink',
    colors: ['White', 'Beige', 'Gray', 'Pink', 'Blue'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 2,
    name: 'Baby Hat',
    price: 12.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Adorable hat for your little one, made with soft yarn.',
    accent: 'blue',
    colors: ['White', 'Pink', 'Blue', 'Yellow', 'Green'],
    sizes: ['0-3 months', '3-6 months', '6-12 months']
  },
  {
    id: 3,
    name: 'Amigurumi Elephant',
    price: 24.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Cute elephant toy, perfect for children of all ages.',
    accent: 'pink',
    colors: ['Gray', 'Pink', 'Blue', 'Green'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 4,
    name: 'Decorative Basket',
    price: 19.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Stylish basket for organizing your home.',
    accent: 'blue',
    colors: ['White', 'Beige', 'Gray', 'Black'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 5,
    name: 'Scarf',
    price: 29.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Warm and stylish scarf for winter days.',
    accent: 'pink',
    colors: ['White', 'Gray', 'Black', 'Red', 'Blue'],
    sizes: ['Regular', 'Long']
  },
  {
    id: 6,
    name: 'Plant Hanger',
    price: 15.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Beautiful macrame plant hanger for your indoor plants.',
    accent: 'blue',
    colors: ['White', 'Beige', 'Gray'],
    sizes: ['Small (for 4-6" pots)', 'Medium (for 6-8" pots)', 'Large (for 8-10" pots)']
  },
];

export default function CheckoutPage({ params }) {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = crochetItems.find(item => item.id === productId);
  const searchParams = useSearchParams();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    notes: ''
  });
  
  // Order details from URL params
  const selectedColor = searchParams.get('color') || (product?.colors[0] || '');
  const selectedSize = searchParams.get('size') || (product?.sizes[0] || '');
  const quantity = parseInt(searchParams.get('quantity') || '1');
  
  // Order status
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/" className="text-sky-500 hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call to create an invoice
    setTimeout(() => {
      const invoiceNumber = Math.floor(100000 + Math.random() * 900000);
      const orderDate = new Date().toLocaleDateString();
      const subtotal = product.price * quantity;
      const tax = subtotal * 0.07;
      const shipping = 5.99;
      const total = subtotal + tax + shipping;
      
      const invoice = {
        invoiceNumber,
        orderDate,
        customerInfo: formData,
        items: [{
          name: product.name,
          price: product.price,
          quantity,
          color: selectedColor,
          size: selectedSize,
          total: subtotal
        }],
        subtotal,
        tax,
        shipping,
        total
      };
      
      setInvoiceData(invoice);
      setOrderPlaced(true);
      setLoading(false);
      
      // Mock function to send invoice to emails
      sendInvoiceEmails(invoice, formData.email);
    }, 1500);
  };
  
  // Mock function to send invoice to emails
  const sendInvoiceEmails = (invoice, customerEmail) => {
    console.log(`Invoice #${invoice.invoiceNumber} would be sent to customer (${customerEmail}) and site owner (owner@cozycrochets.com)`);
  };
  
  if (orderPlaced && invoiceData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Use the shared invoice component for confirmation */}
            <SharedInvoice 
              items={invoiceData.items}
              total={invoiceData.subtotal}
              tax={invoiceData.tax}
              shipping={invoiceData.shipping}
              customerInfo={invoiceData.customerInfo}
              isModal={false}
              orderPlaced={true}
            />
            
            <div className="flex justify-center mt-8">
              <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  const accentColor = product.accent === 'pink' 
    ? 'from-pink-200 to-pink-100' 
    : 'from-sky-200 to-sky-100';
  
  const borderAccent = product.accent === 'pink'
    ? 'border-pink-300' 
    : 'border-sky-300';
  
  const buttonAccent = product.accent === 'pink'
    ? 'bg-pink-400 hover:bg-pink-500'
    : 'bg-sky-400 hover:bg-sky-500';
  
  return (
    <div className={`min-h-screen bg-gradient-to-b ${accentColor}`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link href={`/product/${id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to product
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Checkout</h1>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="firstName">
                        First Name*
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="lastName">
                        Last Name*
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        Email*
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                        Phone*
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                        Address*
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                          City*
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="state">
                          State/Province*
                        </label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="zip">
                          ZIP/Postal Code*
                        </label>
                        <input
                          id="zip"
                          name="zip"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                          value={formData.zip}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="country">
                          Country*
                        </label>
                        <select
                          id="country"
                          name="country"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div> */}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="notes">
                    Order Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Special instructions for your order"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className={`${buttonAccent} text-white font-bold py-3 px-6 rounded-lg w-full hover:shadow-lg transition-all flex justify-center items-center`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="inline-block animate-pulse">Processing...</span>
                  ) : (
                    'Make Order'
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="flex items-center border-b pb-4 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Color: {selectedColor}<br />
                    Size: {selectedSize}<br />
                    Qty: {quantity}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Price × {quantity}</p>
                  <p>Nis. {(product.price * quantity).toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax (7%)</p>
                  <p>Nis. {(product.price * quantity * 0.07).toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p>Nis. 5.99</p>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>Nis. {(product.price * quantity * 1.07 + 5.99).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}