import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Cart from '@/components/Cart';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cozy Crochets',
  description: 'Handmade crochet items made with love',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          {/* The Cart component is rendered here so it’s available globally */}
          <Cart />
        </CartProvider>
      </body>
    </html>
  );
}