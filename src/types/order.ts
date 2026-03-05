import type { Pizza } from './pizza';

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
