import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { OrderItem, Pizza, Order } from '../types';

interface OrderState {
  currentOrder: OrderItem[];
  orderHistory: Order[];
}

const initialState: OrderState = {
  currentOrder: [],
  orderHistory: [], // Would be loaded from localStorage in a real implementation
};

const calculateItemTotals = (item: { pizza: Pizza; quantity: number }): OrderItem => {
  const originalLinePrice = item.pizza.price * item.quantity;
  let discountAmount = 0;

  // Discount Logic: 3 or more of the same pizza = 10% discount on that line item
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
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      state.currentOrder = state.currentOrder.filter((item) => item.pizza.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ pizzaId: string; quantity: number }>) => {
      const item = state.currentOrder.find((item) => item.pizza.id === action.payload.pizzaId);
      if (item) {
        item.quantity = action.payload.quantity;
        const updatedItem = calculateItemTotals(item);
        Object.assign(item, updatedItem);
      }
    },
    clearOrder: (state) => {
      state.currentOrder = [];
    },
    confirmOrder: (state) => {
      if (state.currentOrder.length === 0) return;

      const subtotal = state.currentOrder.reduce((acc, item) => acc + item.originalLinePrice, 0);
      const totalDiscount = state.currentOrder.reduce((acc, item) => acc + item.discountAmount, 0);
      const finalTotal = subtotal - totalDiscount;

      const newOrder: Order = {
        id: crypto.randomUUID(),
        items: [...state.currentOrder],
        subtotal,
        totalDiscount,
        finalTotal,
        timestamp: new Date().toISOString(),
      };

      state.orderHistory.push(newOrder);
      state.currentOrder = [];
      
      // Simulate saving to orders.json by updating localStorage
      const savedOrders = JSON.parse(localStorage.getItem('pizza_orders') || '[]');
      localStorage.setItem('pizza_orders', JSON.stringify([...savedOrders, newOrder]));
    },
  },
});

export const { addToOrder, removeFromOrder, updateQuantity, clearOrder, confirmOrder } = orderSlice.actions;
export default orderSlice.reducer;
