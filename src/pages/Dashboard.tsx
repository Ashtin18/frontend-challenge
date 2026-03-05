import { useAppSelector, useAppDispatch } from '../store/index.ts';
import { toggleCart } from '../store/orderSlice.ts';
import PizzaCard from '../components/pizza/PizzaCard.tsx';
import PizzaFilters from '../components/pizza/PizzaFilters.tsx';
import OrderSummary from '../components/order/OrderSummary.tsx';
import type { Pizza } from '../types/index.ts';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { pizzas, filters } = useAppSelector((state) => state.pizza);
  const currentOrder = useAppSelector((state) => state.order.currentOrder);
  const totalItems = currentOrder.reduce((acc, item) => acc + item.quantity, 0);

  const filteredPizzas = pizzas
    .filter((pizza: Pizza) => {
      const searchTerm = filters.search.toLowerCase().trim();
      const matchesSearch = !searchTerm || 
                            pizza.name.toLowerCase().includes(searchTerm) || 
                            pizza.ingredients.some((i: string) => i.toLowerCase().includes(searchTerm));
      const matchesCategory = filters.category === 'all' || pizza.category === filters.category;
      
      // Ensure we compare numbers
      const pizzaPrice = Number(pizza.price);
      const maxPrice = Number(filters.maxPrice);
      const matchesPrice = pizzaPrice <= maxPrice;
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a: Pizza, b: Pizza) => {
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'name-desc') return b.name.localeCompare(a.name);
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      if (filters.sortBy === 'price-asc') return priceA - priceB;
      if (filters.sortBy === 'price-desc') return priceB - priceA;
      return 0;
    });

  return (
    <div className="animate-fade-in py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-10 md:mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-none mb-4 tracking-tighter uppercase">
            THE BEST <span className="text-orange-600 underline decoration-4 md:decoration-8 decoration-orange-200 underline-offset-4 md:underline-offset-8">PIZZA</span> <br />
            IN THE UNIVERSE
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium">Crafted with the finest ingredients and lots of love.</p>
        </div>
        
        <div className="hidden lg:flex gap-4">
           <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center">
             <span className="text-4xl font-black text-orange-600">{pizzas.length}</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Varieties</span>
           </div>
           <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center">
             <span className="text-4xl font-black text-gray-900">100%</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Premium</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Menu Area */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <PizzaFilters />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPizzas.length > 0 ? (
                filteredPizzas.map((pizza: Pizza) => (
                  <motion.div
                    key={pizza.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PizzaCard pizza={pizza} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl">
                  <p className="text-gray-400 font-black text-2xl uppercase tracking-tighter">
                    No pizzas found with these filters...
                  </p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria!</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Order Summary - Desktop Only */}
        <aside className="hidden lg:block lg:col-span-4">
          <OrderSummary />
        </aside>
      </div>

      {/* Floating Cart Button for Mobile */}
      <AnimatePresence>
        {currentOrder.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[90%] max-w-sm"
          >
            <button
              onClick={() => dispatch(toggleCart())}
              className="w-full bg-linear-to-r from-orange-600 to-red-600 text-white font-black py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-between group active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                   <ShoppingCart size={20} />
                </div>
                <span className="uppercase tracking-widest text-sm">Review Your Order</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="bg-white text-orange-600 px-2 py-0.5 rounded-md text-xs font-black">
                   {totalItems}
                 </span>
                 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
