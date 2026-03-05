import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard.tsx';
import AddPizza from './pages/AddPizza.tsx';
import AdminAnalytics from './pages/AdminAnalytics.tsx';
import PizzaDetails from './pages/PizzaDetails.tsx';
import About from './pages/About.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pizza/:id" element={<PizzaDetails />} />
          <Route path="add-pizza" element={<AddPizza />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
