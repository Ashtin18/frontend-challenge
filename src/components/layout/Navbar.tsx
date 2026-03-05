import { Link } from 'react-router-dom';
import { ShoppingCart, Pizza as PizzaIcon, PlusCircle, LayoutDashboard, BarChart2, HelpCircle } from 'lucide-react';
import { useAppSelector } from '../../store/index.ts';
import type { OrderItem } from '../../types/index.ts';

const Navbar = () => {
  const orderItems = useAppSelector((state) => state.order.currentOrder);
  const totalItems = orderItems.reduce((acc: number, item: OrderItem) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <PizzaIcon className="h-8 w-8 text-orange-500 group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Frontend Challenge
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors">
              <LayoutDashboard size={20} />
              <span>Home</span>
            </Link>
            <Link to="/add-pizza" className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors">
              <PlusCircle size={20} />
              <span>Add Pizza</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors">
              <BarChart2 size={20} />
              <span>Analytics</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors">
              <HelpCircle size={20} />
              <span>About</span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors cursor-default">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
