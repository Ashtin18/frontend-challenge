import { useAppSelector } from '../../store/index.ts';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, DollarSign, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#ea580c', '#f97316', '#fbbf24', '#f59e0b', '#dc2626'];

const Analytics = () => {
  const { pizzas } = useAppSelector((state) => state.pizza);
  const { orderHistory } = useAppSelector((state) => state.order);

  // Data for Price Chart
  const priceData = pizzas.map(p => ({
    name: p.name,
    price: p.price
  })).sort((a, b) => b.price - a.price);

  // Data for Order Distribution
  const categoryCounts: Record<string, number> = {};
  orderHistory.forEach(order => {
    order.items.forEach(item => {
      const cat = item.pizza.category;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + item.quantity;
    });
  });

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value
  }));

  // Summary Stats
  const totalRevenue = orderHistory.reduce((acc, order) => acc + order.finalTotal, 0);
  const totalOrders = orderHistory.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="space-y-8 mb-12">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex items-center gap-4"
        >
          <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Revenue</p>
            <p className="text-2xl font-black text-gray-900">${totalRevenue.toFixed(2)}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex items-center gap-4"
        >
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Orders Confirmed</p>
            <p className="text-2xl font-black text-gray-900">{totalOrders}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex items-center gap-4"
        >
          <div className="p-4 bg-green-100 text-green-600 rounded-2xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Avg. Order Value</p>
            <p className="text-2xl font-black text-gray-900">${avgOrderValue.toFixed(2)}</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Chart */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-orange-600" size={24} />
            <h3 className="text-lg font-black uppercase tracking-tighter text-gray-900">Pizza Price Comparison</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  width={100} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#4b5563' }}
                />
                <Tooltip 
                  cursor={{ fill: '#fff7ed' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                />
                <Bar dataKey="price" fill="#ea580c" radius={[0, 10, 10, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <PieChartIcon className="text-orange-600" size={24} />
            <h3 className="text-lg font-black uppercase tracking-tighter text-gray-900">Order Distribution</h3>
          </div>
          <div className="h-[300px] w-full">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <PieChartIcon size={48} strokeWidth={1} className="mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">No orders yet</p>
                <p className="text-[10px]">Analytics will appear here after your first order</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
