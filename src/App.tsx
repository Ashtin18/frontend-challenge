import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard.tsx';
import AddPizza from './pages/AddPizza.tsx';
import AdminAnalytics from './pages/AdminAnalytics.tsx';

// Placeholder components for routes (to be implemented next)
const PizzaDetails = () => (
  <div className="animate-fade-in flex items-center justify-center py-24">
    <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow-sm uppercase tracking-tighter">
      Pizza <span className="text-orange-600 italic">Details</span> Page
    </h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pizza/:id" element={<PizzaDetails />} />
          <Route path="add-pizza" element={<AddPizza />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
