import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import CartDrawer from '../order/CartDrawer.tsx';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Frontend Challenge. Built for success.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
