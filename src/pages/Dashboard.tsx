import { useAppSelector } from '../store/index.ts';
import PizzaCard from '../components/pizza/PizzaCard.tsx';
import PizzaFilters from '../components/pizza/PizzaFilters.tsx';
import OrderSummary from '../components/order/OrderSummary.tsx';
import type { Pizza } from '../types/index.ts';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { pizzas, filters } = useAppSelector((state) => state.pizza);

  const filteredPizzas = pizzas
    .filter((pizza: Pizza) => {
      const matchesSearch = pizza.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                            pizza.ingredients.some((i: string) => i.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesCategory = filters.category === 'all' || pizza.category === filters.category;
      const matchesPrice = pizza.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a: Pizza, b: Pizza) => {
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="animate-fade-in py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <h1 className="text-6xl font-black text-gray-900 leading-none mb-4 tracking-tighter">
            THE BEST <span className="text-orange-600 underline decoration-8 decoration-orange-200 underline-offset-8">PIZZA</span> <br />
            IN THE UNIVERSE
          </h1>
          <p className="text-xl text-gray-500 font-medium">Crafted with the finest ingredients and lots of love.</p>
        </div>
        
        <div className="hidden lg:flex gap-4">
           {/* Decorative elements or stats could go here */}
           <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center">
             <span className="text-4xl font-black text-orange-600">6+</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Varieties</span>
           </div>
           <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center">
             <span className="text-4xl font-black text-gray-900">100%</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Natural</span>
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

        {/* Sidebar Order Summary */}
        <aside className="lg:col-span-4">
          <OrderSummary />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
