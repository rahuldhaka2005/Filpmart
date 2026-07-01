import React from 'react';

export default function Banner() {
  return (
    <div className="mx-2 md:mx-auto max-w-7xl mb-4 bg-white shadow-sm overflow-hidden flex h-40 md:h-[280px] cursor-pointer group relative">
       <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&q=80" alt="Sale Banner" className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500" />
       <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-8 md:px-16 text-white pointer-events-none">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Big Billion Days</h2>
          <p className="text-lg md:text-xl font-medium text-[#ffe500]">Up to 80% Off on Electronics</p>
       </div>
    </div>
  );
}
