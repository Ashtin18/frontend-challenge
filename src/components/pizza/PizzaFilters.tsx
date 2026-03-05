import { Search, Filter, SortAsc } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/index.ts';
import { setSearch, setCategory, setMaxPrice, setSortBy } from '../../store/pizzaSlice.ts';
import type { SortOption } from '../../types/index.ts';

const categories = ['all', 'Vegetarian', 'Meat', 'Seafood', 'Spicy'];

const PizzaFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.pizza.filters);

  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl mb-12 flex flex-col lg:flex-row items-center gap-6">
      {/* Search Input */}
      <div className="relative grow w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for your favorite pizza..."
          className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder-gray-400"
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
        {/* Category Filter */}
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-200">
          <Filter className="ml-3 h-4 w-4 text-gray-400" />
          <select
            className="bg-transparent pl-2 pr-8 py-2 text-sm font-medium text-gray-700 outline-none appearance-none cursor-pointer"
            value={filters.category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Filter */}
        <div className="flex flex-col gap-1 px-4 min-w-[150px]">
          <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <span>Price Range</span>
            <span className="text-orange-600">${filters.maxPrice} max</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            value={filters.maxPrice}
            onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-200 ml-auto lg:ml-0">
          <SortAsc className="ml-3 h-4 w-4 text-gray-400" />
          <select
            className="bg-transparent pl-2 pr-8 py-2 text-sm font-medium text-gray-700 outline-none appearance-none cursor-pointer"
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
          >
            <option value="name-asc">A - Z</option>
            <option value="name-desc">Z - A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PizzaFilters;
