import { describe, it, expect, beforeEach, vi } from 'vitest';
import orderReducer, { addToOrder, removeFromOrder, updateQuantity, clearOrder } from '../orderSlice.ts';
import type { Pizza } from '../../types/index.ts';

const mockPizza: Pizza = {
  id: '1',
  name: 'Margherita',
  price: 10,
  ingredients: ['Tomato', 'Mozzarella'],
  category: 'Vegetarian',
  imageUrl: 'test.jpg'
};

describe('orderSlice reducer', () => {
  beforeEach(() => {    
    // Clear localStorage before each test
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  const initialState = {
    currentOrder: [],
    orderHistory: [],
    loading: false,
  };

  it('should handle adding a pizza to the order', () => {
    const action = addToOrder({ pizza: mockPizza, quantity: 1 });
    const newState = orderReducer(initialState, action);

    expect(newState.currentOrder).toHaveLength(1);
    expect(newState.currentOrder[0].pizza.id).toBe('1');
    expect(newState.currentOrder[0].quantity).toBe(1);
    expect(newState.currentOrder[0].originalLinePrice).toBe(10);
    expect(newState.currentOrder[0].discountAmount).toBe(0);
  });

  it('should increment quantity if same pizza is added again', () => {
    const stateWithOne = orderReducer(initialState, addToOrder({ pizza: mockPizza, quantity: 1 }));
    const newState = orderReducer(stateWithOne, addToOrder({ pizza: mockPizza, quantity: 1 }));

    expect(newState.currentOrder).toHaveLength(1);
    expect(newState.currentOrder[0].quantity).toBe(2);
    expect(newState.currentOrder[0].originalLinePrice).toBe(20);
  });

  it('should apply 10% discount for 3 or more pizzas', () => {
    const action = addToOrder({ pizza: mockPizza, quantity: 3 });
    const newState = orderReducer(initialState, action);

    expect(newState.currentOrder[0].quantity).toBe(3);
    expect(newState.currentOrder[0].originalLinePrice).toBe(30);
    expect(newState.currentOrder[0].discountAmount).toBe(3); // 10% of 30
    expect(newState.currentOrder[0].finalLineTotal).toBe(27);
  });

  it('should handle removing a pizza from the order', () => {
    const stateWithOne = orderReducer(initialState, addToOrder({ pizza: mockPizza, quantity: 1 }));
    const newState = orderReducer(stateWithOne, removeFromOrder('1'));

    expect(newState.currentOrder).toHaveLength(0);
  });

  it('should handle updating quantity and recalculated discounts', () => {
    const stateWithTwo = orderReducer(initialState, addToOrder({ pizza: mockPizza, quantity: 2 }));
    
    // Update to 3 - should trigger discount
    const stateWithThree = orderReducer(stateWithTwo, updateQuantity({ pizzaId: '1', quantity: 3 }));
    expect(stateWithThree.currentOrder[0].discountAmount).toBe(3);

    // Update back to 1 - should remove discount
    const stateWithOne = orderReducer(stateWithThree, updateQuantity({ pizzaId: '1', quantity: 1 }));
    expect(stateWithOne.currentOrder[0].discountAmount).toBe(0);
  });

  it('should clear the entire order', () => {
    const stateWithOne = orderReducer(initialState, addToOrder({ pizza: mockPizza, quantity: 1 }));
    const newState = orderReducer(stateWithOne, clearOrder());

    expect(newState.currentOrder).toHaveLength(0);
  });
});
