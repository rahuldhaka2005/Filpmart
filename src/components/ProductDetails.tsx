import React from 'react';
import { X, ShoppingCart, Zap, Star } from 'lucide-react';
import { Product } from '../types';

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductDetails({ product, onClose, onAddToCart }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-center items-center p-0 md:p-6">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
      <div className="relative w-full h-full md:h-auto max-h-[100vh] max-w-5xl bg-white md:rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
        
        {/* Left side - Image & Actions */}
        <div className="w-full md:w-2/5 p-4 md:p-8 flex flex-col items-center border-r bg-white overflow-y-auto">
          <div className="h-64 md:h-96 w-full flex justify-center mb-6 p-4 border rounded-sm">
             <img src={product.image} alt={product.title} className="max-h-full object-contain hover:scale-105 transition-transform" />
          </div>
          <div className="flex gap-2 w-full mt-auto">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-[#ff9f00] text-white py-3.5 rounded-sm font-semibold flex items-center justify-center gap-2 uppercase shadow hover:bg-[#f09500] transition"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-[#fb641b] text-white py-3.5 rounded-sm font-semibold flex items-center justify-center gap-2 uppercase shadow hover:bg-[#e05615] transition"
            >
              <Zap className="w-5 h-5 fill-current" /> Buy Now
            </button>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto bg-white">
          <div className="text-sm text-gray-500 mb-2 hover:text-[#2874f0] cursor-pointer">
            Home {'>'} {product.category} {'>'} {product.title}
          </div>
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center gap-1">
              {product.rating} <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-gray-500 text-sm font-medium">{product.reviews.toLocaleString('en-IN')} Ratings & Reviews</span>
            {product.assured && (
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5" />
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-end gap-3 mb-1">
              <span className="text-3xl font-medium">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-gray-500 line-through text-base mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-green-600 text-sm font-bold mb-1">{product.discount}% off</span>
            </div>
            <p className="text-sm font-medium text-gray-800 mt-4">Available offers</p>
            <ul className="text-sm mt-2 space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-600">🏷️</span> <span><b>Bank Offer</b> 5% Cashback on Flipkart Axis Bank Card</span></li>
              <li className="flex items-start gap-2"><span className="text-green-600">🏷️</span> <span><b>Special Price</b> Get extra 10% off (price inclusive of cashback/coupon)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-600">🏷️</span> <span><b>Partner Offer</b> Sign-up for Pay Later & get free Times Prime Benefits</span></li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Product Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              This {product.category.toLowerCase()} is designed for those who appreciate quality and style. 
              Equipped with top-tier specifications and a sleek exterior, it provides an outstanding experience. 
              Whether you are using it for your daily tasks or special occasions, it delivers exceptional performance 
              and reliability that you can trust.
            </p>
            
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-medium text-gray-900 mb-4 text-lg">Specifications</h4>
              <div className="grid grid-cols-3 text-sm py-3 border-b border-gray-100">
                <span className="text-gray-500">Brand</span>
                <span className="col-span-2 font-medium">Premium Generic</span>
              </div>
              <div className="grid grid-cols-3 text-sm py-3 border-b border-gray-100">
                <span className="text-gray-500">Category</span>
                <span className="col-span-2">{product.category}</span>
              </div>
              <div className="grid grid-cols-3 text-sm py-3 border-b border-gray-100">
                <span className="text-gray-500">In The Box</span>
                <span className="col-span-2">1 Unit, User Manual, Warranty Card</span>
              </div>
              <div className="grid grid-cols-3 text-sm py-3">
                <span className="text-gray-500">Warranty</span>
                <span className="col-span-2">1 Year Manufacturer Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
