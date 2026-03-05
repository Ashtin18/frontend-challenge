import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/index.ts';
import { addPizzaToCatalog } from '../store/pizzaSlice.ts';
import { PizzaIcon, Plus, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const pizzaSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  price: z.number().min(5, 'Price must be at least $5').max(50, 'Price cannot exceed $50'),
  category: z.enum(['Vegetarian', 'Meat', 'Seafood', 'Spicy']),
  ingredients: z.string().min(5, 'Please list at least a few ingredients'),
  imageUrl: z.string().url('Please enter a valid image URL'),
  isRecommended: z.boolean().optional(),
});

type PizzaFormValues = z.infer<typeof pizzaSchema>;

const AddPizza = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PizzaFormValues>({
    resolver: zodResolver(pizzaSchema),
    defaultValues: {
      name: '',
      category: 'Vegetarian',
      isRecommended: false,
      price: 15,
      ingredients: '',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop'
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: PizzaFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const newPizza = {
      ...data,
      id: crypto.randomUUID(),
      ingredients: data.ingredients.split(',').map((i) => i.trim()),
    };

    dispatch(addPizzaToCatalog(newPizza));
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-bold uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-24"
          >
            <div className="mb-12 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-none mb-4 tracking-tighter uppercase">
                CREATE <span className="text-orange-600 underline decoration-4 md:decoration-8 decoration-orange-200 underline-offset-4 md:underline-offset-8">PIZZA</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-medium italic">"Design your masterpiece and join our menu."</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-4 text-gray-900 mb-6 font-black uppercase tracking-tighter text-sm">
                <PizzaIcon className="h-5 w-5 text-orange-600" />
                <span>Menu Preview</span>
              </div>
              
              <div className="rounded-2xl overflow-hidden mb-4 aspect-video relative group">
                <img 
                  src={watchedValues.imageUrl || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Preview"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-orange-600 shadow-lg">
                  ${watchedValues.price?.toFixed(2) || '0.00'}
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter truncate">
                {watchedValues.name || 'Your Pizza Name'}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                {watchedValues.category} Category
              </p>
              
              <div className="flex flex-wrap gap-1">
                {(watchedValues.ingredients || 'Tomato, Cheese').split(',').slice(0, 3).map((ing, i) => (
                  <span key={i} className="text-[9px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded-lg uppercase">
                    {ing.trim()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
          >
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle2 size={80} className="text-green-500 mb-6" />
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">Success!</h2>
                <p className="text-gray-500 font-medium">Your pizza has been added to the catalog.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Pizza Name</label>
                  <input
                    {...register('name')}
                    placeholder="e.g. Vulcano Pepperoni"
                    className={`block w-full px-5 py-4 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase ml-2">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Base Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                    className={`block w-full px-5 py-4 bg-gray-50 border ${errors.price ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium`}
                  />
                  {errors.price && <p className="text-red-500 text-[10px] font-bold uppercase ml-2">{errors.price.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category</label>
                <select
                  {...register('category')}
                  className="block w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Meat">Meat</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Spicy">Spicy</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Ingredients (Comma Separated)</label>
                <textarea
                  {...register('ingredients')}
                  placeholder="e.g. Tomato sauce, Mozzarella, Pepperoni, Spicy oil"
                  rows={3}
                  className={`block w-full px-5 py-4 bg-gray-50 border ${errors.ingredients ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium resize-none`}
                />
                {errors.ingredients && <p className="text-red-500 text-[10px] font-bold uppercase ml-2">{errors.ingredients.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Image URL</label>
                <input
                  {...register('imageUrl')}
                  placeholder="https://images.unsplash.com/..."
                  className={`block w-full px-5 py-4 bg-gray-50 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium`}
                />
                {errors.imageUrl && <p className="text-red-500 text-[10px] font-bold uppercase ml-2">{errors.imageUrl.message}</p>}
              </div>

              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <input
                  type="checkbox"
                  id="isRecommended"
                  {...register('isRecommended')}
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="isRecommended" className="text-xs font-bold text-orange-800 uppercase tracking-wider cursor-pointer">
                  Mark as Recommended by the Chef
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group bg-gray-900 hover:bg-orange-600 text-white font-black py-5 rounded-3xl transition-all duration-300 transform active:scale-[0.98] shadow-2xl hover:shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className={`flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  CREATE PIZZA
                  <Plus size={20} />
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin" size={24} />
                  </div>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddPizza;
