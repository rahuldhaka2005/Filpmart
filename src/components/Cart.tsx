import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  onOrderSuccess: () => void;
}

export default function Cart({ isOpen, onClose, items, updateQuantity, removeItem, onOrderSuccess }: CartProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const mrpTotal = items.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const discount = mrpTotal - total;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // 1. Create order on our backend
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total })
      });
      const data = await res.json();
      
      if (!data.success) {
        alert("Failed to create order");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_mockkey", // Enter the Key ID generated from the Dashboard
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Flipmart",
        description: "Test Transaction",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&q=80",
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response: any) {
          // 2. Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: { items, totalAmount: total }
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful! Order placed.");
            onOrderSuccess();
            onClose();
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test.user@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#2874f0"
        }
      };

      if (data.isMock) {
         // Mock handling if no razorpay keys are found on the server
         options.handler({ razorpay_payment_id: "mock_pay_id", razorpay_order_id: data.order.id, razorpay_signature: "mock_sig" });
      } else {
         const rzp1 = new (window as any).Razorpay(options);
         rzp1.on('payment.failed', function (response: any){
             alert("Payment Failed. " + response.error.description);
         });
         rzp1.open();
      }

    } catch (err) {
      console.error(err);
      alert("Error initiating checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#f1f3f6] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm z-10">
          <h2 className="text-lg font-medium">My Cart ({items.length})</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition text-gray-500"><X /></button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 bg-white m-4 rounded shadow-sm p-6">
              <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                 <span className="text-6xl">🛒</span>
              </div>
              <h3 className="text-xl font-medium">Your cart is empty!</h3>
              <p className="text-sm text-gray-500">Explore our wide selection and find something you like</p>
              <button onClick={onClose} className="bg-[#2874f0] text-white px-10 py-3 shadow-sm rounded-sm font-medium mt-4">Shop Now</button>
            </div>
          ) : (
            <div className="space-y-3 p-3">
              {items.map(item => (
                <div key={item.id} className="bg-white p-4 shadow-sm rounded-sm flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-[15px] hover:text-[#2874f0] cursor-pointer line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-semibold text-lg">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="text-gray-500 line-through text-xs">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-green-600 text-xs font-bold">{item.discount}% Off</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50" disabled={item.quantity <= 1}>-</button>
                        <span className="font-medium border px-4 py-0.5 rounded-sm bg-gray-50">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-50">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-black hover:text-[#2874f0] font-medium text-[15px] hover:underline transition">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Price Details */}
        {items.length > 0 && (
          <div className="border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
            <div className="p-4 space-y-3">
              <h3 className="text-gray-500 font-medium uppercase text-[15px] border-b pb-3 mb-2">Price Details</h3>
              <div className="flex justify-between text-[15px]">
                <span>Price ({items.length} items)</span>
                <span>₹{mrpTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[15px] text-green-600">
                <span>Discount</span>
                <span>- ₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free Delivery</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t mt-3 border-dashed">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-green-600 text-[15px] font-medium pt-1">You will save ₹{discount.toLocaleString('en-IN')} on this order</p>
            </div>
            
            <div className="p-4 border-t bg-white flex justify-end shadow-inner">
               <button 
                 onClick={handleCheckout}
                 disabled={isProcessing}
                 className="w-full sm:w-auto bg-[#fb641b] text-white px-12 py-3.5 rounded-sm font-semibold text-lg shadow hover:bg-[#e05615] transition uppercase flex items-center justify-center disabled:opacity-70">
                 {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : "Place Order"}
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
