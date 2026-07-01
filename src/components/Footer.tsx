import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#172337] text-white pt-12 pb-8 mt-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-[13px]">
        <div>
          <h4 className="text-gray-400 mb-4 uppercase font-medium">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Flipmart Stories</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
            <li><a href="#" className="hover:underline">Corporate Information</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-400 mb-4 uppercase font-medium">Help</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Payments</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Report Infringement</a></li>
          </ul>
        </div>
        <div className="border-l border-gray-700 pl-8">
          <h4 className="text-gray-400 mb-4 uppercase font-medium">Mail Us:</h4>
          <p className="text-gray-300 leading-relaxed">
            Flipmart Internet Private Limited, <br />
            Buildings Alyssa, Begonia & <br />
            Clove Embassy Tech Village, <br />
            Outer Ring Road, Devarabeesanahalli Village, <br />
            Bengaluru, 560103, <br />
            Karnataka, India
          </p>
        </div>
        <div>
          <h4 className="text-gray-400 mb-4 uppercase font-medium">Registered Office Address:</h4>
          <p className="text-gray-300 leading-relaxed mb-4">
            Flipmart Internet Private Limited, <br />
            Buildings Alyssa, Begonia & <br />
            Clove Embassy Tech Village, <br />
            Outer Ring Road, Devarabeesanahalli Village, <br />
            Bengaluru, 560103, <br />
            Karnataka, India <br />
            CIN : U51109KA2012PTC066107 <br />
            Telephone: <a href="tel:044-45614700" className="text-blue-500">044-45614700</a>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-300">
        <div className="flex space-x-6 mb-4 md:mb-0">
           <span className="flex items-center"><span className="text-[#ffe500] mr-2">⭐</span> Become a Seller</span>
           <span className="flex items-center"><span className="text-[#ffe500] mr-2">🌟</span> Advertise</span>
           <span className="flex items-center"><span className="text-[#ffe500] mr-2">🎁</span> Gift Cards</span>
           <span className="flex items-center"><span className="text-[#ffe500] mr-2">❓</span> Help Center</span>
        </div>
        <p>© 2007-{new Date().getFullYear()} Flipmart.com</p>
      </div>
    </footer>
  );
}
