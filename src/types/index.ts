export interface Pizza {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
  category: string;
  imageUrl: string;
  isRecommended?: boolean;
}

export interface OrderItem {
  pizza: Pizza;
  quantity: number;
  originalLinePrice: number;
  discountAmount: number;
  finalLineTotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
  timestamp: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export interface PizzaFilters {
  search: string;
  category: string;
  maxPrice: number;
  sortBy: SortOption;
}
