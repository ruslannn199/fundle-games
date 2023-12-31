import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ProductData } from '../../types/interfaces';
import CartActionCreators from './cart.actions';
import { handleAddToCart, handleAppendToCart, countAmountOfCartItems, handleReduceCartItem, handleRemoveCartItem, countTotal } from './cart.utils';

const { addToCart, appendCartItem, removeCartItem, reduceCartItem, clearCartItems } = CartActionCreators;

interface CartState {
  cartItems: ProductData[];
  cartItemsAmount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: [],
  cartItemsAmount: 0,
  total: 0,
}

const cartReducer = createReducer(initialState, (builder) => {
  const quantityIncrement = 1;
  builder
    .addCase(
      addToCart,
      (state, { payload }: PayloadAction<ProductData>) => {
        const newCartItems = handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: payload,
        });
        return {
          ...state,
          cartItems: newCartItems,
          cartItemsAmount: state.cartItemsAmount + quantityIncrement,
          total: countTotal(newCartItems),
        };
      },
    )
    .addCase(
      appendCartItem,
      (state, { payload }: PayloadAction<string>) => {
        const newCartItems = handleAppendToCart(state.cartItems, payload);
        return {
          ...state,
          cartItems: newCartItems,
          cartItemsAmount: state.cartItemsAmount + quantityIncrement,
          total: countTotal(newCartItems),
        };
      }
    )
    .addCase(
      removeCartItem,
      (state, { payload }: PayloadAction<string>) => {
        const newCartItems = handleRemoveCartItem(state.cartItems, payload);
        return {
          ...state,
          cartItems: newCartItems,
          cartItemsAmount: countAmountOfCartItems(newCartItems),
          total: countTotal(newCartItems),
        };
      },
    )
    .addCase(
      reduceCartItem,
      (state, { payload }: PayloadAction<string>) => {
        const newCartItems = handleReduceCartItem(state.cartItems, payload);
        return {
          ...state,
          cartItems: newCartItems,
          cartItemsAmount: state.cartItemsAmount - quantityIncrement,
          total: countTotal(newCartItems),
        };
      }
    )
    .addCase(
      clearCartItems,
      (state) => ({ ...state, ...initialState })
    )
});

export default cartReducer;
