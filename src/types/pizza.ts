export interface Pizza {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
  category: 'Vegetarian' | 'Meat' | 'Seafood' | 'Spicy';
  imageUrl: string;
  isRecommended?: boolean;
}

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export interface PizzaFilters {
  search: string;
  category: string;
  maxPrice: number;
  sortBy: SortOption;
}
