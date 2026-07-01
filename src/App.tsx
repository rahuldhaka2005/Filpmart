import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Banner from './components/Banner';
import ProductRow from './components/ProductRow';
import Cart from './components/Cart';
import Orders from './components/Orders';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import { bestOfElectronics, trendingSmartphones, topFashion } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: Auto open cart on add
    // setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrderSuccess = () => {
    setCartItems([]);
    setIsOrdersOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar 
        cartCount={totalCartItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onOrdersClick={() => setIsOrdersOpen(true)}
      />
      
      <main className="flex-1 w-full pb-8">
        <Categories />
        <Banner />
        
        <ProductRow 
          title="Best of Electronics" 
          products={bestOfElectronics} 
          onAddToCart={addToCart} 
          onProductClick={setSelectedProduct}
        />
        
        <ProductRow 
          title="Trending Smartphones" 
          products={trendingSmartphones} 
          onAddToCart={addToCart} 
          onProductClick={setSelectedProduct}
        />

        <ProductRow 
          title="Top Styles for You" 
          products={topFashion} 
          onAddToCart={addToCart} 
          onProductClick={setSelectedProduct}
        />
      </main>

      <Footer />

      <ProductDetails 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          addToCart(p);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
      />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        onOrderSuccess={handleOrderSuccess}
      />

      <Orders 
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </div>
  );
}
