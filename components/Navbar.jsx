"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">
              Cozy<span className="text-sky-400">Crochets</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="px-3 py-2 text-gray-700 hover:text-sky-500">
              Home
            </Link>
            <Link href="/contact" className="px-3 py-2 text-gray-700 hover:text-sky-500">
              Contact
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button 
              className="p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-2 transition-all duration-300">
          <Link 
            href="/" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/contact" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
