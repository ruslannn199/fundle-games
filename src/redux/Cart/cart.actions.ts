import { createAction } from '@reduxjs/toolkit';
import { ProductData } from '../../types/interfaces';

export enum ActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_CART_ITEM = 'REMOVE_CART_ITEM',
  REDUCE_CART_ITEM = 'REDUCE_CART_ITEM',
  CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS',
}

const CartActionCreators = {
  addToCart: createAction<ProductData>(ActionType.ADD_TO_CART),
  reduceCartItem: createAction<string>(ActionType.REDUCE_CART_ITEM),
  removeCartItem: createAction<string>(ActionType.REMOVE_CART_ITEM),
  clearCartItems: createAction(ActionType.CLEAR_CART_ITEMS),
}

export default CartActionCreators;
