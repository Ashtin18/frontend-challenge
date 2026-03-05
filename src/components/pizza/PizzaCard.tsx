import { Plus, Info, Star } from 'lucide-react';
import type { Pizza } from '../../types/index.ts';
import { useAppDispatch } from '../../store/index.ts';
import { addToOrder } from '../../store/orderSlice.ts';
import { Link } from 'react-router-dom';

interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    dispatch(addToOrder({ pizza, quantity: 1 }));
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pizza.imageUrl}
          alt={pizza.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {pizza.isRecommended && (
            <span className="flex items-center gap-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              <Star size={10} fill="currentColor" />
              RECOMMENDED
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            {pizza.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
            {pizza.name}
          </h3>
          <span className="text-xl font-black text-orange-600">
            ${pizza.price}
          </span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {pizza.ingredients.join(', ')}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={handleAddClick}
            className="flex-grow flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-200"
          >
            <Plus size={18} />
            <span className='text-xs'>Add to Order</span>
          </button>
          
          <Link
            to={`/pizza/${pizza.id}`}
            className="p-2.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 bg-gray-50 rounded-xl transition-all"
            title="View Details"
          >
            <Info size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
