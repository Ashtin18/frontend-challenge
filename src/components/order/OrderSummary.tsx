import { Trash2, Plus, Minus, CheckCircle, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/index.ts';
import { updateQuantity, removeFromOrder, addOrderToHistory, setLoading } from '../../store/orderSlice.ts';
import type { OrderItem, Order } from '../../types/index.ts';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const OrderSummary = () => {
  const dispatch = useAppDispatch();
  const { currentOrder, loading } = useAppSelector((state) => state.order);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset success state when a new item is added to the order
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (currentOrder.length > 0 && showSuccess) {
      timeout = setTimeout(() => setShowSuccess(false), 0);
    }
    return () => clearTimeout(timeout);
  }, [currentOrder.length, showSuccess]);

  const subtotal = currentOrder.reduce((acc: number, item: OrderItem) => acc + item.originalLinePrice, 0);
  const totalDiscount = currentOrder.reduce((acc: number, item: OrderItem) => acc + item.discountAmount, 0);
  const finalTotal = subtotal - totalDiscount;

  const handleConfirm = async () => {
    if (currentOrder.length === 0) return;
    
    dispatch(setLoading(true));
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: crypto.randomUUID(),
      items: [...currentOrder],
      subtotal,
      totalDiscount,
      finalTotal,
      timestamp: new Date().toISOString(),
    };

    dispatch(addOrderToHistory(newOrder));
    dispatch(setLoading(false));
    setShowSuccess(true);
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-red-600 p-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 opacity-80" />
            <h2 className="text-xl font-black uppercase tracking-wider">Your Order</h2>
          </div>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
            {currentOrder.length} Items
          </span>
        </div>
      </div>

      <div className="p-6">
        {showSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">Order Confirmed!</h3>
            <p className="text-gray-500 text-sm mb-6">Your delicious pizza is being prepared. Check Analytics to see your order history!</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-orange-600 font-bold uppercase tracking-widest text-[10px] hover:underline"
            >
              Start New Order
            </button>
          </motion.div>
        ) : currentOrder.length === 0 ? (
          <div className="py-12 text-center">
            <CreditCard className="mx-auto h-16 w-16 text-gray-200 mb-4" strokeWidth={1} />
            <p className="text-gray-400 font-medium">Your basket is hungry...</p>
            <p className="text-sm text-gray-400">Add some delicious pizzas!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {currentOrder.map((item: OrderItem) => (
                <motion.div
                  key={item.pizza.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex items-center justify-between gap-4 p-4 bg-white/60 hover:bg-white transition-colors rounded-2xl border border-transparent hover:border-orange-100 shadow-sm grow"
                >
                  <div className="grow">
                    <h4 className="font-bold text-gray-800 leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                      {item.pizza.name}
                    </h4>
                    <div className="flex items-center gap-2">
                       {item.discountAmount > 0 ? (
                         <>
                           <span className="text-xs line-through text-gray-400">${item.originalLinePrice.toFixed(2)}</span>
                            <span className="text-sm font-black text-green-600 uppercase tracking-tighter">
                              Sale: ${item.finalLineTotal.toFixed(2)} 
                              <span className="ml-1 text-[10px]">(-${item.discountAmount.toFixed(2)})</span>
                            </span>
                         </>
                       ) : (
                         <span className="text-sm font-bold text-gray-600">${item.finalLineTotal.toFixed(2)}</span>
                       )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1 shadow-inner">
                      <button
                        onClick={() => dispatch(updateQuantity({ pizzaId: item.pizza.id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="p-1 hover:text-orange-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-gray-800 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ pizzaId: item.pizza.id, quantity: item.quantity + 1 }))}
                        className="p-1 hover:text-orange-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromOrder(item.pizza.id))}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {currentOrder.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            {totalDiscount > 0 && (
              <div className="flex justify-between text-green-600 text-sm bg-green-50 p-3 rounded-xl border border-green-100 group animate-pulse">
                <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px]">
                  Special Promo (Bulk Discount)
                </span>
                <span className="font-black text-lg">-${totalDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-900 font-black uppercase text-xs tracking-widest">Grand Total</span>
              <span className="text-3xl font-black text-gray-900 drop-shadow-sm tabular-nums">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full mt-6 group flex items-center justify-center gap-3 bg-gray-900 hover:bg-orange-500 text-white font-black py-4 rounded-2xl transition-all duration-300 transform active:scale-95 shadow-xl shadow-gray-200 hover:shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>PROCESSING...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM ORDER</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
