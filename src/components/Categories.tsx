import React from 'react';
import { categories } from '../data';

export default function Categories() {
  return (
    <div className="bg-white shadow-sm mt-2 md:mt-0 mb-2 px-2 py-4 overflow-x-auto scrollbar-hide max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between md:justify-center md:gap-16 min-w-max px-4">
        {categories.map(cat => (
          <div key={cat.id} className="flex flex-col items-center cursor-pointer group px-3">
            <div className="w-[72px] h-[72px] mb-2 overflow-hidden flex items-center justify-center p-1">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform bg-gray-100" />
            </div>
            <span className="text-sm font-medium text-gray-800 group-hover:text-[#2874f0]">{cat.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
