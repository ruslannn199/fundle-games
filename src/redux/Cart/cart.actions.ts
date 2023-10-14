import { createAction } from '@reduxjs/toolkit';
import { ProductData } from '../../types/interfaces';

export enum ActionType {
  ADD_TO_CART = 'ADD_TO_CART',
}

const CartActionCreators = {
  addToCart: createAction<ProductData>(ActionType.ADD_TO_CART),
}

export default CartActionCreators;
