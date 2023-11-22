import { createAction } from '@reduxjs/toolkit';
import { FetchProductParams, type ProductData, type Products } from '../../types/interfaces';

export enum ActionType {
  ADD_NEW_PRODUCT_START = 'ADD_NEW_PRODUCT_START',
  FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START',
  FETCH_PRODUCT_START = 'FETCH_PRODUCT_START',
  SET_MULTIPLE_PRODUCTS = 'SET_MULTIPLE_PRODUCTS',
  SET_PRODUCT = 'SET_PRODUCT',
  DELETE_PRODUCT_START = 'DELETE_PRODUCT_START',
}

export interface AddProductStartAction {
  type: ActionType.ADD_NEW_PRODUCT_START;
  payload: ProductData;
}

export interface DeleteProductStartAction {
  type: ActionType.DELETE_PRODUCT_START;
  payload: string;
}

export interface FetchProductsStartAction {
  type: ActionType.FETCH_PRODUCTS_START;
  payload: FetchProductParams;
}

export interface FetchProductStartAction {
  type: ActionType.FETCH_PRODUCT_START,
  payload: string,
}

const ProductsActionCreators = {
  addProductStart: createAction<ProductData>(ActionType.ADD_NEW_PRODUCT_START),
  fetchProductsStart: createAction<FetchProductParams>(ActionType.FETCH_PRODUCTS_START),
  fetchProductStart: createAction<string>(ActionType.FETCH_PRODUCT_START),
  setMultipleProducts: createAction<Products>(ActionType.SET_MULTIPLE_PRODUCTS),
  setProduct: createAction<ProductData | null>(ActionType.SET_PRODUCT),
  deleteProductStart: createAction<string>(ActionType.DELETE_PRODUCT_START),
}

export default ProductsActionCreators;
