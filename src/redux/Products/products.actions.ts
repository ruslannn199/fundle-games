import { createAction } from '@reduxjs/toolkit';
import type { ProductData, Products } from '../../types/interfaces';

export enum ActionType {
  ADD_NEW_PRODUCT_START = 'ADD_NEW_PRODUCT_START',
  FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START',
  SET_MULTIPLE_PRODUCTS = 'SET_MULTIPLE_PRODUCTS',
  SET_PRODUCT = 'SET_PRODUCT',
  DELETE_PRODUCT_START = 'DELETE_PRODUCT_START',
}

export interface AddProductStartAction {
  type: ActionType.ADD_NEW_PRODUCT_START;
  payload: ProductData;
}

export interface DeleteProductStartAction {
  type: ActionType.DELETE_PRODUCT_START,
  payload: string;
}

const ProductsActionCreators = {
  addProductStart: createAction<ProductData>(ActionType.ADD_NEW_PRODUCT_START),
  setMultipleProducts: createAction<Products>(ActionType.SET_MULTIPLE_PRODUCTS),
  fetchProductsStart: createAction(ActionType.FETCH_PRODUCTS_START),
  deleteProductStart: createAction<string>(ActionType.DELETE_PRODUCT_START),
}

export default ProductsActionCreators;