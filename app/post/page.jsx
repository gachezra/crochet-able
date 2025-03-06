"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Upload, X, Plus, Image as ImageIcon } from 'lucide-react';

export default function UploadItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    accent: 'pink',
    colors: ['White'],
    sizes: ['Medium'],
    image: null
  });
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Conditional styling based on accent color
  const accentColor = formData.accent === 'pink' 
    ? 'from-pink-200 to-pink-100' 
    : 'from-sky-200 to-sky-100';
    
  const borderAccent = formData.accent === 'pink'
    ? 'border-pink-300' 
    : 'border-sky-300';
  
  const buttonAccent = formData.accent === 'pink'
    ? 'bg-pink-400 hover:bg-pink-500'
    : 'bg-sky-400 hover:bg-sky-500';
  
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAccentChange = (accent) => {
    setFormData({
      ...formData,
      accent
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData({
        ...formData,
        colors: [...formData.colors, newColor]
      });
      setNewColor('');
    }
  };
  
  const removeColor = (color) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(c => c !== color)
    });
  };
  
  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, newSize]
      });
      setNewSize('');
    }
  };
  
  const removeSize = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter(s => s !== size)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitted:', formData);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          price: '',
          description: '',
          accent: 'pink',
          colors: ['White'],
          sizes: ['Medium'],
          image: null
        });
        setPreviewUrl('');
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-b ${accentColor}`}>
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-all">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Admin Dashboard
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800">Upload New Item</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-white/20 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image Upload */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Product Image
                </label>
                <div 
                  className={`border-2 border-dashed ${borderAccent} rounded-lg p-4 text-center h-64 flex flex-col items-center justify-center relative overflow-hidden`}
                >
                  {previewUrl ? (
                    <>
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button 
                          type="button"
                          onClick={() => {
                            setPreviewUrl('');
                            setFormData({...formData, image: null});
                          }}
                          className="bg-red-500 text-white p-2 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={48} className="text-gray-400 mb-2" />
                      <p className="text-gray-500 mb-2">Drag and drop or click to upload</p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <button 
                        type="button"
                        className={`${buttonAccent} text-white px-4 py-2 rounded-lg mt-2`}
                        onClick={() => document.querySelector('input[type="file"]').click()}
                      >
                        Select Image
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Accent Color
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`w-12 h-12 rounded-full bg-pink-400 border-2 ${formData.accent === 'pink' ? 'border-gray-800 ring-2 ring-pink-200' : 'border-transparent'}`}
                    onClick={() => handleAccentChange('pink')}
                  ></button>
                  <button
                    type="button"
                    className={`w-12 h-12 rounded-full bg-sky-400 border-2 ${formData.accent === 'blue' ? 'border-gray-800 ring-2 ring-sky-200' : 'border-transparent'}`}
                    onClick={() => handleAccentChange('blue')}
                  ></button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form Fields */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleTextChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3" htmlFor="price">
                  Price (NIS)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleTextChange}
                  step="0.01"
                  min="0.01"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                  placeholder="29.99"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleTextChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500"
                  placeholder="Describe your product in detail"
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Available Colors
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.colors.map(color => (
                    <div key={color} className={`inline-flex items-center bg-gray-100 px-3 py-1 rounded-full ${borderAccent}`}>
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
                    className={`${buttonAccent} text-white px-4 py-2 rounded-r-lg`}
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
                  {formData.sizes.map(size => (
                    <div key={size} className={`inline-flex items-center bg-gray-100 px-3 py-1 rounded-full ${borderAccent}`}>
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
                    className={`${buttonAccent} text-white px-4 py-2 rounded-r-lg`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8">
            <button
              type="submit"
              disabled={submitting || success}
              className={`${buttonAccent} text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : success ? (
                <span className="flex items-center">
                  ✓ Product Added Successfully
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Product
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
}