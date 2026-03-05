import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { OrderItem, Pizza, Order } from '../types';

interface OrderState {
  currentOrder: OrderItem[];
  orderHistory: Order[];
  loading: boolean;
  isCartOpen: boolean;
}

const loadOrderHistory = (): Order[] => {
  const saved = localStorage.getItem('pizza_orders');
  return saved ? JSON.parse(saved) : [];
};

const loadCurrentOrder = (): OrderItem[] => {
  const saved = localStorage.getItem('pizza_current_order');
  return saved ? JSON.parse(saved) : [];
};

const initialState: OrderState = {
  currentOrder: loadCurrentOrder(),
  orderHistory: loadOrderHistory(),
  loading: false,
  isCartOpen: false,
};

const calculateItemTotals = (item: { pizza: Pizza; quantity: number }): OrderItem => {
  const originalLinePrice = item.pizza.price * item.quantity;
  let discountAmount = 0;

  // Discount: 10% for 3+ items of the same pizza
  if (item.quantity >= 3) {
    discountAmount = originalLinePrice * 0.1;
  }

  const finalLineTotal = originalLinePrice - discountAmount;

  return {
    ...item,
    originalLinePrice,
    discountAmount,
    finalLineTotal,
  };
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addToOrder: (state, action: PayloadAction<{ pizza: Pizza; quantity: number }>) => {
      const existingItemIndex = state.currentOrder.findIndex(
        (item) => item.pizza.id === action.payload.pizza.id
      );

      if (existingItemIndex > -1) {
        state.currentOrder[existingItemIndex].quantity += action.payload.quantity;
        state.currentOrder[existingItemIndex] = calculateItemTotals(state.currentOrder[existingItemIndex]);
      } else {
        state.currentOrder.push(calculateItemTotals(action.payload));
      }
      localStorage.setItem('pizza_current_order', JSON.stringify(state.currentOrder));
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      state.currentOrder = state.currentOrder.filter((item) => item.pizza.id !== action.payload);
      localStorage.setItem('pizza_current_order', JSON.stringify(state.currentOrder));
    },
    updateQuantity: (state, action: PayloadAction<{ pizzaId: string; quantity: number }>) => {
      const item = state.currentOrder.find((item) => item.pizza.id === action.payload.pizzaId);
      if (item) {
        item.quantity = action.payload.quantity;
        const updatedItem = calculateItemTotals(item);
        Object.assign(item, updatedItem);
      }
      localStorage.setItem('pizza_current_order', JSON.stringify(state.currentOrder));
    },
    clearOrder: (state) => {
      state.currentOrder = [];
      localStorage.removeItem('pizza_current_order');
    },
    addOrderToHistory: (state, action: PayloadAction<Order>) => {
      state.orderHistory.push(action.payload);
      state.currentOrder = [];
      localStorage.setItem('pizza_orders', JSON.stringify(state.orderHistory));
      localStorage.removeItem('pizza_current_order');
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const { 
  addToOrder, 
  removeFromOrder, 
  updateQuantity, 
  clearOrder, 
  addOrderToHistory,
  setLoading,
  toggleCart,
  setCartOpen
} = orderSlice.actions;
export default orderSlice.reducer;
