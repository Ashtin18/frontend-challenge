import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Pizza as PizzaIcon, PlusCircle, LayoutDashboard, BarChart2, HelpCircle, Menu, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/index.ts';
import { toggleCart } from '../../store/orderSlice.ts';
import type { OrderItem } from '../../types/index.ts';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const orderItems = useAppSelector((state) => state.order.currentOrder);
  const totalItems = orderItems.reduce((acc: number, item: OrderItem) => acc + item.quantity, 0);

  const navLinks = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Home' },
    { to: '/add-pizza', icon: <PlusCircle size={20} />, label: 'Add Pizza' },
    { to: '/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    { to: '/about', icon: <HelpCircle size={20} />, label: 'About' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 group">
              <PizzaIcon className="h-8 w-8 text-orange-500 group-hover:rotate-12 transition-transform" />
              <span className="text-lg md:text-xl font-black bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent uppercase tracking-tighter">
                Frontend Challenge
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`flex items-center space-x-1 font-bold text-sm uppercase tracking-widest transition-colors ${
                  location.pathname === link.to ? 'text-orange-600' : 'text-gray-500 hover:text-orange-500'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={`flex items-center space-x-4 p-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
                    location.pathname === link.to 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`${location.pathname === link.to ? 'text-orange-600' : 'text-gray-400'}`}>
                    {link.icon}
                  </div>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
