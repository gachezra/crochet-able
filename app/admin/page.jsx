"use client";
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Plus, Search, Edit, Trash2, ChevronRight, Save, X } from 'lucide-react';

export default function AdminPanel() {
  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      description: 'Premium cotton t-shirt with a relaxed fit. Perfect for everyday wear.',
      accent: 'pink',
      colors: ['White', 'Black', 'Gray'],
      sizes: ['Small', 'Medium', 'Large', 'XL'],
      image: 'https://picsum.photos/id/21/500/500',
      inventory: 42
    },
    {
      id: 2,
      name: 'Vintage Denim Jacket',
      price: 89.99,
      description: 'Classic denim jacket with distressed details. Made from high-quality materials for durability.',
      accent: 'blue',
      colors: ['Blue', 'Light Blue'],
      sizes: ['Medium', 'Large', 'XL'],
      image: 'https://picsum.photos/id/1011/500/500',
      inventory: 15
    },
    {
      id: 3,
      name: 'Summer Floral Dress',
      price: 59.99,
      description: 'Lightweight floral print dress perfect for summer. Features a flowy silhouette and adjustable straps.',
      accent: 'pink',
      colors: ['Pink Floral', 'Blue Floral'],
      sizes: ['Small', 'Medium', 'Large'],
      image: 'https://picsum.photos/id/64/500/500',
      inventory: 23
    },
    {
      id: 4,
      name: 'Athletic Performance Shorts',
      price: 34.99,
      description: 'Breathable athletic shorts with moisture-wicking technology. Ideal for workouts and casual wear.',
      accent: 'blue',
      colors: ['Black', 'Navy', 'Gray'],
      sizes: ['Small', 'Medium', 'Large', 'XL', 'XXL'],
      image: 'https://picsum.photos/id/325/500/500',
      inventory: 38
    }
  ];

  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedAccent, setSelectedAccent] = useState('pink');
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Accent color styles
  const getAccentColor = (accent) => 
    accent === 'pink' ? 'from-pink-200 to-pink-100' : 'from-sky-200 to-sky-100';
  
  const getBorderAccent = (accent) =>
    accent === 'pink' ? 'border-pink-300' : 'border-sky-300';
  
  const getButtonAccent = (accent) =>
    accent === 'pink' ? 'bg-pink-400 hover:bg-pink-500' : 'bg-sky-400 hover:bg-sky-500';

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Start editing a product
  const handleEditProduct = (product) => {
    setEditingProduct({...product});
    setSelectedAccent(product.accent);
    setIsEditing(true);
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Handle text field changes in edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  // Handle accent color change
  const handleAccentChange = (accent) => {
    setSelectedAccent(accent);
    setEditingProduct({
      ...editingProduct,
      accent
    });
  };

  // Add color to editing product
  const addColor = () => {
    if (newColor && !editingProduct.colors.includes(newColor)) {
      setEditingProduct({
        ...editingProduct,
        colors: [...editingProduct.colors, newColor]
      });
      setNewColor('');
    }
  };
  
  // Remove color from editing product
  const removeColor = (color) => {
    setEditingProduct({
      ...editingProduct,
      colors: editingProduct.colors.filter(c => c !== color)
    });
  };
  
  // Add size to editing product
  const addSize = () => {
    if (newSize && !editingProduct.sizes.includes(newSize)) {
      setEditingProduct({
        ...editingProduct,
        sizes: [...editingProduct.sizes, newSize]
      });
      setNewSize('');
    }
  };
  
  // Remove size from editing product
  const removeSize = (size) => {
    setEditingProduct({
      ...editingProduct,
      sizes: editingProduct.sizes.filter(s => s !== size)
    });
  };

  // Save edited product
  const handleSaveProduct = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? editingProduct : product
      ));
      setSaving(false);
      setIsEditing(false);
      setEditingProduct(null);
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-sky-200 to-sky-100`}>
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-all">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Store
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800">Product Management</h1>
        
        {isEditing ? (
          // Edit Product Form
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-white/20 p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
              <button 
                onClick={() => setIsEditing(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image Preview */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Product Image
                  </label>
                  <div className={`border-2 ${getBorderAccent(selectedAccent)} rounded-lg p-4 text-center h-64 relative overflow-hidden`}>
                    <img 
                      src={editingProduct?.image} 
                      alt={editingProduct?.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Accent Color
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className={`w-12 h-12 rounded-full bg-pink-400 border-2 ${selectedAccent === 'pink' ? 'border-gray-800 ring-2 ring-pink-200' : 'border-transparent'}`}
                      onClick={() => handleAccentChange('pink')}
                    ></button>
                    <button
                      type="button"
                      className={`w-12 h-12 rounded-full bg-sky-400 border-2 ${selectedAccent === 'blue' ? 'border-gray-800 ring-2 ring-sky-200' : 'border-transparent'}`}
                      onClick={() => handleAccentChange('blue')}
                    ></button>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Form Fields */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3" htmlFor="edit-name">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editingProduct?.name || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3" htmlFor="edit-price">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    value={editingProduct?.price || ''}
                    onChange={handleEditChange}
                    step="0.01"
                    min="0.01"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3" htmlFor="edit-inventory">
                    Inventory
                  </label>
                  <input
                    type="number"
                    id="edit-inventory"
                    name="inventory"
                    value={editingProduct?.inventory || ''}
                    onChange={handleEditChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3" htmlFor="edit-description">
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editingProduct?.description || ''}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Available Colors
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editingProduct?.colors.map(color => (
                      <div key={color} className={`inline-flex items-center bg-gray-100 px-3 py-1 rounded-full ${getBorderAccent(selectedAccent)}`}>
                        <span className="mr-1">{color}</span>
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                      placeholder="Add a color"
                    />
                    <button
                      type="button"
                      onClick={addColor}
                      className={`${getButtonAccent(selectedAccent)} text-white px-4 py-2 rounded-r-lg`}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editingProduct?.sizes.map(size => (
                      <div key={size} className={`inline-flex items-center bg-gray-100 px-3 py-1 rounded-full ${getBorderAccent(selectedAccent)}`}>
                        <span className="mr-1">{size}</span>
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                      placeholder="Add a size"
                    />
                    <button
                      type="button"
                      onClick={addSize}
                      className={`${getButtonAccent(selectedAccent)} text-white px-4 py-2 rounded-r-lg`}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 mr-4"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                disabled={saving}
                className={`${getButtonAccent(selectedAccent)} text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Product List View
          <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-white/20 p-8 mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                  />
                </div>
                <Link href="/post" className={`${getButtonAccent(selectedAccent)} text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center whitespace-nowrap`}>
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Product
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colors</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sizes</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Nis. {product.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.colors.length}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.sizes.length}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-sky-600 hover:text-sky-900 mr-4"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found. Try a different search or add a new product.</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-gray-600">Page 1 of 1</span>
                <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}