import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/index.ts';
import { setCartOpen } from '../../store/orderSlice.ts';
import OrderSummary from './OrderSummary.tsx';

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.order.isCartOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setCartOpen(false))}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-80 lg:hidden bg-white rounded-t-[2.5rem] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 right-0 left-0 p-4 bg-white border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900 ml-4">Review Your Order</h2>
              <button
                onClick={() => dispatch(setCartOpen(false))}
                className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-orange-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <OrderSummary isInModal={true} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
