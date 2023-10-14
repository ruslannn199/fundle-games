import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ProductData } from '../../types/interfaces';
import CartActionCreators from './cart.actions';
import { handleAddToCart, handleAmountOfCartItems } from './cart.utils';

const { addToCart } = CartActionCreators;

interface CartState {
  cartItems: ProductData[];
  cartItemsAmount: number;
}

const initialState: CartState = {
  cartItems: [],
  cartItemsAmount: 0,
}

const cartReducer = createReducer(initialState, (builder) => {
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
          cartItemsAmount: handleAmountOfCartItems(newCartItems),
        };
      },
    )
});

export default cartReducer;
