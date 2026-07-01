import React, { useEffect, useState } from 'react';
import { X, Package, CheckCircle2 } from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  paymentId: string;
  totalAmount: number;
  status: string;
  date: string;
  items: any[];
}

export default function Orders({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        // Sort by date descending
        const sortedOrders = data.orders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-[#f1f3f6] h-[80vh] md:h-[90vh] rounded-md shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b bg-white shadow-sm z-10 shrink-0">
          <h2 className="text-xl font-medium flex items-center">
            <Package className="mr-2 text-[#2874f0]" /> My Orders
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2874f0]"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 bg-white rounded shadow-sm p-8">
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                 <Package className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-medium">No orders found</h3>
              <p className="text-sm text-gray-500 max-w-xs">Looks like you haven't placed any orders yet.</p>
              <button onClick={onClose} className="bg-[#2874f0] text-white px-8 py-2.5 shadow-sm rounded-sm font-medium mt-4 hover:bg-blue-600 transition">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded shadow-sm overflow-hidden border border-gray-100">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b flex flex-wrap justify-between items-center gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-0.5">Order Placed</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Total</p>
                      <p className="font-medium">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-right flex-1 min-w-[200px]">
                      <p className="text-gray-500 mb-0.5">Order ID <span className="font-medium text-gray-800">#{order.orderId.replace('order_', '').substring(0, 10).toUpperCase()}</span></p>
                      <p className="text-gray-500 text-xs">Payment ID: {order.paymentId}</p>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="p-4 sm:p-6 divide-y">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 sm:gap-6 py-4 first:pt-0 last:pb-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded p-2 border">
                          <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-medium text-gray-900 hover:text-[#2874f0] cursor-pointer line-clamp-2 sm:line-clamp-1 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">Qty: {item.quantity}</p>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        <div className="hidden sm:flex flex-col items-end justify-center min-w-[120px]">
                          <div className="flex items-center text-green-600 font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                            {order.status}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Your item has been placed.</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Mobile Status */}
                    <div className="sm:hidden pt-3 mt-3 flex items-center text-green-600 font-medium text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      {order.status} - Your order is confirmed.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
