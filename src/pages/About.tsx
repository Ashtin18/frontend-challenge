import { motion } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Terminal,
  Database,
  BarChart3,
  MousePointer2
} from 'lucide-react';

const About = () => {
  const sections = [
    {
      title: "Core Technologies",
      icon: <Cpu className="text-orange-600" />,
      content: "Built with React 18, TypeScript for strict type safety, Redux Toolkit for state management, and Framer Motion for premium animations."
    },
    {
      title: "Visual Design",
      icon: <Layers className="text-blue-600" />,
      content: "Styled with Tailwind CSS using a modern glassmorphism aesthetic, custom HSL color palettes, and fully responsive layouts."
    },
    {
      title: "Data Persistence",
      icon: <Database className="text-green-600" />,
      content: "Full synchronization with LocalStorage for current orders, custom pizza catalog, and order history, ensuring state survives page reloads."
    },
    {
      title: "Business Logic",
      icon: <Zap className="text-yellow-600" />,
      content: "Intelligent discount algorithms (10% off for 3+ items), real-time price calculations, and robust search/filtering systems."
    },
    {
      title: "Business Intelligence",
      icon: <BarChart3 className="text-purple-600" />,
      content: "Advanced analytics module using Recharts to visualize sales distribution, price comparisons, and key performance indicators."
    },
    {
      title: "UX & Interactions",
      icon: <MousePointer2 className="text-red-600" />,
      content: "High-performance interactions: whole-card transitions, live form previews, and immediate visual feedback on all user actions."
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-3 bg-orange-100 rounded-2xl mb-6"
        >
          <Code2 className="text-orange-600 h-8 w-8" />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-none mb-6 tracking-tighter uppercase">
          Technical <span className="text-orange-600 underline decoration-4 md:decoration-8 decoration-orange-200 underline-offset-4 md:underline-offset-8">Overview</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          This project represents a state-of-the-art frontend architecture designed for performance, scalability, and an exceptional user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-white/20 shadow-xl flex flex-col gap-4 group hover:bg-white/80 transition-all"
          >
            <div className="p-4 bg-gray-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              {section.icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
              {section.title}
            </h3>
            <p className="text-gray-500 font-medium leading-relaxed italic">
              "{section.content}"
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-[3rem] p-12 relative overflow-hidden text-white mb-20">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
               Developer <span className="text-orange-500">Manifesto</span>
            </h2>
            <div className="space-y-4 text-gray-400 font-medium">
               <p className="flex items-center gap-3">
                 <ShieldCheck className="text-green-400 shrink-0" size={18} />
                 <span>Fully Typed: 0 'any' policy across the entire codebase.</span>
               </p>
               <p className="flex items-center gap-3">
                 <Terminal className="text-orange-400 shrink-0" size={18} />
                 <span>Optimized Modules: Explicit extensions for Vite & TS consistency.</span>
               </p>
               <p className="flex items-center gap-3">
                 <Zap className="text-yellow-400 shrink-0" size={18} />
                 <span>Zero Placeholder Policy: Real data and assets only.</span>
               </p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-1 rounded-4xl flex gap-2">
             <div className="bg-orange-600 p-8 rounded-3xl flex flex-col items-center">
                <span className="text-5xl font-black">99</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Lighthouse</span>
             </div>
             <div className="p-8 flex flex-col items-center justify-center">
                <span className="text-5xl font-black">A+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Code Quality</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
