import React from 'react';
import { Search, ShoppingCart, User, MoreVertical, Store, Package } from 'lucide-react';

export default function Navbar({ cartCount, onCartClick, onOrdersClick }: { cartCount: number, onCartClick: () => void, onOrdersClick: () => void }) {
  return (
    <header className="bg-[#2874f0] sticky top-0 z-50 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer">
            <div className="flex flex-col">
              <span className="italic font-bold text-2xl tracking-tight leading-none">Flipmart</span>
              <span className="text-[11px] italic hover:underline flex items-center gap-1 text-gray-200 mt-1">
                Explore <span className="text-[#ffe500] font-bold">Plus</span>
                <span className="text-[#ffe500]">✦</span>
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-4 md:px-12 hidden sm:block">
            <div className="relative group">
              <input
                type="text"
                className="w-full bg-white text-black text-sm px-4 py-2.5 rounded-sm shadow-sm outline-none border border-transparent focus:border-[#2874f0] focus:ring-1 focus:ring-blue-200 transition-all"
                placeholder="Search for products, brands and more"
              />
              <Search className="absolute right-3 top-2.5 text-[#2874f0] h-5 w-5" />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-6 text-[15px] font-medium">
            <button className="hidden md:flex bg-white text-[#2874f0] px-8 py-1.5 rounded-sm font-semibold hover:bg-gray-50 transition-colors shadow">
              Login
            </button>
            <div className="hidden lg:flex items-center cursor-pointer hover:font-bold">
              <Store className="h-4 w-4 mr-2" />
              Become a Seller
            </div>
            <div 
              className="hidden lg:flex items-center cursor-pointer hover:font-bold group relative"
              onClick={onOrdersClick}
            >
              <Package className="h-4 w-4 mr-1" />
              Orders
            </div>
            <div
              className="flex items-center cursor-pointer font-bold relative group"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2 bg-[#ff6161] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Search */}
        <div className="pb-3 sm:hidden">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-white text-black text-sm px-4 py-2 rounded-sm outline-none"
                placeholder="Search for products..."
              />
              <Search className="absolute right-3 top-2 text-[#2874f0] h-5 w-5" />
            </div>
        </div>
      </div>
    </header>
  );
}
