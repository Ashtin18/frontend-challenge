import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/index.ts';
import { addToOrder } from '../store/orderSlice.ts';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Star, 
  Flame, 
  Leaf, 
  Waves, 
  Beef,
  ShoppingCart,
  Clock,
  ChevronRight,
  CheckCircle,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PizzaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  
  const pizza = useAppSelector((state) => 
    state.pizza.pizzas.find((p) => p.id === id)
  );

  if (!pizza) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Pizza Not Found</h2>
        <p className="text-gray-500 mb-8 font-medium">The pizza you're looking for disappeared into another dimension.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-orange-200 hover:scale-105 transition-transform"
        >
          BACK TO MENU
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToOrder({ pizza, quantity }));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Vegetarian': return <Leaf size={18} className="text-green-500" />;
      case 'Spicy': return <Flame size={18} className="text-red-500" />;
      case 'Meat': return <Beef size={18} className="text-orange-900" />;
      case 'Seafood': return <Waves size={18} className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Navigation */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="mb-12 flex items-center gap-2 text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase tracking-widest text-xs group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-orange-500/20 to-red-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden border border-white shadow-2xl">
              <img 
                src={pizza.imageUrl} 
                alt={pizza.name}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              
              {pizza.isRecommended && (
                <div className="absolute top-6 left-6 bg-yellow-400 text-yellow-900 font-black px-4 py-2 rounded-full text-xs shadow-lg flex items-center gap-2 animate-bounce">
                  <Star size={14} fill="currentColor" />
                  CHEF'S SPECIAL
                </div>
              )}
            </div>
          </div>

          {/* Micro-stats / Details */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg text-center">
              <Clock className="mx-auto mb-2 text-orange-500" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Prep Time</p>
              <p className="text-lg font-black text-gray-900">15-20m</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg text-center">
              <Flame className="mx-auto mb-2 text-red-500" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Calories</p>
              <p className="text-lg font-black text-gray-900">850kcal</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg text-center">
              <Star className="mx-auto mb-2 text-yellow-500" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rating</p>
              <p className="text-lg font-black text-gray-900">4.9/5</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Info & Purchase */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col h-full"
        >
          <div className="mb-4 flex items-center gap-3">
             <div className="bg-gray-100 p-2 rounded-xl">
               {getCategoryIcon(pizza.category)}
             </div>
             <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
               {pizza.category} Category
             </span>
          </div>

          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6 uppercase">
            {pizza.name}
          </h1>

          <div className="flex items-center gap-6 mb-8">
            <div className="text-5xl font-black text-orange-600 tracking-tighter">
              ${pizza.price.toFixed(2)}
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-gray-500 text-sm font-medium leading-relaxed italic">
              "Authentic recipe made with the freshest premium ingredients selected by our experts."
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {pizza.ingredients.map((ing, idx) => (
                <span 
                  key={idx}
                  className="bg-white border border-gray-100 shadow-xs px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:border-orange-200 hover:bg-orange-50 transition-colors"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Action Box */}
          <div className="mt-auto bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="relative flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Select Quantity</p>
                  <div className="flex items-center gap-4 bg-white/10 p-2 rounded-2xl border border-white/10">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="text-white hover:text-orange-500 transition-colors p-1"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-2xl font-black text-white w-8 text-center tabular-nums">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="text-white hover:text-orange-500 transition-colors p-1"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Total</p>
                  <div className="flex flex-col items-end">
                    {quantity >= 3 && (
                      <span className="text-orange-400 text-[10px] font-black line-through opacity-50">
                        ${(pizza.price * quantity).toFixed(2)}
                      </span>
                    )}
                    <p className="text-4xl font-black text-white tabular-nums">
                      ${(quantity >= 3 ? (pizza.price * quantity * 0.9) : (pizza.price * quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {quantity >= 3 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl text-orange-500">
                      <Tag size={16} />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        10% Bulk Discount Applied! (3+ Pizzas)
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full flex items-center justify-center gap-3 font-black py-5 rounded-4xl transition-all transform active:scale-95 shadow-xl ${
                  isAdded 
                  ? 'bg-green-500 text-white cursor-default' 
                  : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-900/40'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle size={20} className="animate-bounce" />
                    <span>ADDED TO ORDER!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>ADD TO ORDER</span>
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PizzaDetails;
