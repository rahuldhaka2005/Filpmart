import React from 'react';
import { Product } from '../types';

export default function ProductRow({ title, products, onAddToCart, onProductClick }: { title: string, products: Product[], onAddToCart: (p: Product) => void, onProductClick: (p: Product) => void }) {
  return (
    <div className="bg-white mx-2 md:mx-auto max-w-7xl mb-4 shadow-sm">
      <div className="px-5 py-4 border-b flex justify-between items-center">
        <h2 className="text-[22px] font-medium text-black">{title}</h2>
        <button className="bg-[#2874f0] text-white px-5 py-2 rounded-sm shadow text-sm font-semibold hover:bg-blue-700 transition">
          VIEW ALL
        </button>
      </div>
      <div className="flex overflow-x-auto p-4 scrollbar-hide divide-x divide-gray-100">
        {products.map(product => (
          <div 
            key={product.id} 
            onClick={() => onProductClick(product)}
            className="min-w-[220px] flex flex-col items-center group cursor-pointer hover:shadow-lg p-4 transition-all bg-white relative"
          >
            <div className="h-40 mb-6 relative flex justify-center w-full">
              <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            
            <h3 className="text-sm font-medium text-center truncate w-full group-hover:text-[#2874f0]">{product.title}</h3>
            {product.tagline && <p className="text-green-600 text-sm mt-1">{product.tagline}</p>}
            
            <div className="flex items-center gap-1 mt-1">
               <div className="bg-green-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center">
                 {product.rating} ★
               </div>
               <span className="text-gray-500 text-xs">({product.reviews.toLocaleString('en-IN')})</span>
            </div>

            <div className="mt-4 w-full flex flex-col items-center">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-lg">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-gray-500 line-through text-xs">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-green-600 text-xs font-bold">{product.discount}% off</span>
              
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="w-full mt-4 border border-gray-300 text-black py-2 rounded-sm hover:border-[#2874f0] hover:text-[#2874f0] font-medium text-sm transition-colors uppercase"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
