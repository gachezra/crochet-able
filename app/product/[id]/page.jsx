"use client";
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

// Mock data for crochet items (same as in app/page.js)
const crochetItems = [
  {
    id: 1,
    name: 'Cozy Blanket',
    price: 45.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'A beautiful handmade blanket perfect for chilly evenings. Each blanket is made with premium yarn that is soft to the touch and durable for everyday use. The intricate pattern adds a touch of elegance to any room.',
    accent: 'pink',
    colors: ['White', 'Beige', 'Gray', 'Pink', 'Blue'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 2,
    name: 'Baby Hat',
    price: 12.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Adorable hat for your little one, made with soft, hypoallergenic yarn. This hat is perfect for keeping your baby warm during colder months while looking absolutely adorable. Each hat is carefully crafted to ensure comfort and style.',
    accent: 'blue',
    colors: ['White', 'Pink', 'Blue', 'Yellow', 'Green'],
    sizes: ['0-3 months', '3-6 months', '6-12 months']
  },
  {
    id: 3,
    name: 'Amigurumi Elephant',
    price: 24.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Cute elephant toy, perfect for children of all ages. Each elephant is handcrafted with love and attention to detail. The soft yarn makes it perfect for cuddling, and the sturdy construction ensures it will last for years of play.',
    accent: 'pink',
    colors: ['Gray', 'Pink', 'Blue', 'Green'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 4,
    name: 'Decorative Basket',
    price: 19.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Stylish basket for organizing your home. These baskets are both functional and beautiful, perfect for storing small items while adding a handmade touch to your décor. Each basket is made with durable yarn that holds its shape.',
    accent: 'blue',
    colors: ['White', 'Beige', 'Gray', 'Black'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 5,
    name: 'Scarf',
    price: 29.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Warm and stylish scarf for winter days. This scarf is made with premium yarn that is soft against the skin while providing excellent warmth. The beautiful pattern adds a touch of elegance to any winter outfit.',
    accent: 'pink',
    colors: ['White', 'Gray', 'Black', 'Red', 'Blue'],
    sizes: ['Regular', 'Long']
  },
  {
    id: 6,
    name: 'Plant Hanger',
    price: 15.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Beautiful macrame plant hanger for your indoor plants. This hanger adds a touch of bohemian style to any room while safely displaying your favorite plants. Each hanger is carefully knotted to ensure durability and style.',
    accent: 'blue',
    colors: ['White', 'Beige', 'Gray'],
    sizes: ['Small (for 4-6" pots)', 'Medium (for 6-8" pots)', 'Large (for 8-10" pots)']
  },
];

export default function ProductPage({ params }) {
  const id = parseInt(params.id);
  const product = crochetItems.find(item => item.id === id);
  const { addItemToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
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
  
  const accentColor = product.accent === 'pink' 
    ? 'from-pink-200 to-pink-100' 
    : 'from-sky-200 to-sky-100';

  const borderAccent = product.accent === 'pink'
    ? 'border-pink-300' 
    : 'border-sky-300';
  
  const buttonAccent = product.accent === 'pink'
    ? 'bg-pink-400 hover:bg-pink-500'
    : 'bg-sky-400 hover:bg-sky-500';
    
  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-b ${accentColor}`}>
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-all">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to all products
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-white/20">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent z-10"></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-72 md:h-full object-cover md:object-contain p-4 transition-all duration-500 hover:scale-105"
              />
            </div>
            
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
              <p className="text-2xl text-gray-700 mb-4 font-light">Nis. {product.price}</p>
              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
              
              <div className={`border-t ${borderAccent} pt-8 mb-8`}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                          selectedColor === color 
                            ? `${borderAccent} bg-gray-50 shadow-md transform scale-105` 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                          selectedSize === size 
                            ? `${borderAccent} bg-gray-50 shadow-md transform scale-105` 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center max-w-xs">
                    <button
                      className="border border-gray-200 rounded-l-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="border-t border-b border-gray-200 text-center w-20 py-2 focus:outline-none"
                    />
                    <button
                      className="border border-gray-200 rounded-r-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className={`${buttonAccent} text-white font-medium py-3 px-6 rounded-lg flex-1 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  {addedToCart ? 'Added to Cart! ✓' : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </button>
                <Link href={`/checkout/${id}?color=${selectedColor}&size=${selectedSize}&quantity=${quantity}`} className="flex-1">
                  <button className="bg-gray-800 text-white font-medium py-3 px-6 rounded-lg w-full hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}