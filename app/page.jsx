"use client";
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for crochet items
const crochetItems = [
  {
    id: 1,
    name: 'Cozy Blanket',
    price: 45.99,
    image: 'https://picsum.photos/400/300?random=1',
    description: 'A beautiful handmade blanket perfect for chilly evenings.',
    accent: 'pink'
  },
  {
    id: 2,
    name: 'Baby Hat',
    price: 12.99,
    image: 'https://picsum.photos/400/300?random=2',
    description: 'Adorable hat for your little one, made with soft yarn.',
    accent: 'blue'
  },
  {
    id: 3,
    name: 'Amigurumi Elephant',
    price: 24.99,
    image: 'https://picsum.photos/400/300?random=3',
    description: 'Cute elephant toy, perfect for children of all ages.',
    accent: 'pink'
  },
  {
    id: 4,
    name: 'Decorative Basket',
    price: 19.99,
    image: 'https://picsum.photos/400/300?random=4',
    description: 'Stylish basket for organizing your home.',
    accent: 'blue'
  },
  {
    id: 5,
    name: 'Scarf',
    price: 29.99,
    image: 'https://picsum.photos/400/300?random=5',
    description: 'Warm and stylish scarf for winter days.',
    accent: 'pink'
  },
  {
    id: 6,
    name: 'Plant Hanger',
    price: 15.99,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Beautiful macrame plant hanger for your indoor plants.',
    accent: 'blue'
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = crochetItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cozy Crochets</h1>
          <p className="text-xl text-gray-600">Handmade with love, perfect for your home</p>
        </div>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full md:w-1/2 mx-auto block border border-gray-300 rounded-lg px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id}>
              <div className="card p-3 mx-6 md:mx-4">
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className={`absolute top-0 right-0 px-3 py-1 m-2 text-white font-bold rounded ${
                      item.accent === 'pink' ? 'bg-pink-400' : 'bg-sky-400'
                    }`}
                  >
                    ${item.price}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 line-clamp-2">{item.description}</p>
                  <button className="btn-primary mt-4 w-full">View Details</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}