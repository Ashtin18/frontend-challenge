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

const initialState: PizzaState = {
  pizzas: pizzasData as Pizza[],
  filters: {
    search: '',
    category: 'all',
    maxPrice: 20,
    sortBy: 'name-asc',
  },
  loading: false,
  error: null,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.filters.maxPrice = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.filters.sortBy = action.payload;
    },
    addPizzaToCatalog: (state, action: PayloadAction<Pizza>) => {
      state.pizzas.push(action.payload);
      // In a real app we would persist this to the JSON file via an API
    },
  },
});

export const { setSearch, setCategory, setMaxPrice, setSortBy, addPizzaToCatalog } = pizzaSlice.actions;
export default pizzaSlice.reducer;
