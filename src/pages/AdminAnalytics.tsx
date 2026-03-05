import Analytics from '../components/dashboard/Analytics.tsx';
import { motion } from 'framer-motion';
import { TrendingUp, Award } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="animate-fade-in py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <h1 className="text-6xl font-black text-gray-900 leading-none mb-4 tracking-tighter uppercase">
            Business <span className="text-orange-600 underline decoration-8 decoration-orange-200 underline-offset-8">Intelligence</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium">Data-driven insights for your pizza empire.</p>
        </div>
        
        <div className="hidden lg:flex gap-4">
           <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center">
             <TrendingUp className="text-orange-600 mb-2" size={24} />
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Growth</span>
           </div>
           <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center">
             <Award className="text-gray-900 mb-2" size={24} />
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Top Rated</span>
           </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Analytics />
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
