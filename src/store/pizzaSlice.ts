import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pizza, PizzaFilters, SortOption } from '../types';
import pizzasData from '../data/pizzas.json';

interface PizzaState {
  pizzas: Pizza[];
  filters: PizzaFilters;
  loading: boolean;
  error: string | null;
}

const loadCustomPizzas = (): Pizza[] => {
  const saved = localStorage.getItem('custom_pizzas');
  return saved ? JSON.parse(saved) : [];
};

const loadFilters = (): PizzaFilters => {
  const saved = localStorage.getItem('pizza_filters');
  const defaults: PizzaFilters = {
    search: '',
    category: 'all',
    maxPrice: 50,
    sortBy: 'name-asc',
  };
  
  if (!saved) return defaults;
  
  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaults,
      ...parsed,
      // If the saved maxPrice is lower than 50, we reset it to 50 
      // to ensure new pizzas aren't hidden by default
      maxPrice: Math.max(Number(parsed.maxPrice) || 50, 50)
    };
  } catch {
    return defaults;
  }
};

const initialState: PizzaState = {
  pizzas: [...pizzasData, ...loadCustomPizzas()] as Pizza[],
  filters: loadFilters(),
  loading: false,
  error: null,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      localStorage.setItem('pizza_filters', JSON.stringify(state.filters));
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      localStorage.setItem('pizza_filters', JSON.stringify(state.filters));
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.filters.maxPrice = action.payload;
      localStorage.setItem('pizza_filters', JSON.stringify(state.filters));
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.filters.sortBy = action.payload;
      localStorage.setItem('pizza_filters', JSON.stringify(state.filters));
    },
    addPizzaToCatalog: (state, action: PayloadAction<Pizza>) => {
      state.pizzas.push(action.payload);
      const saved = localStorage.getItem('custom_pizzas');
      const customPizzas = saved ? JSON.parse(saved) : [];
      localStorage.setItem('custom_pizzas', JSON.stringify([...customPizzas, action.payload]));
    },
  },
});

export const { setSearch, setCategory, setMaxPrice, setSortBy, addPizzaToCatalog } = pizzaSlice.actions;
export default pizzaSlice.reducer;
