import { createAction } from '@reduxjs/toolkit';
import { ProductData, Products } from '../../types/interfaces';
import { ActionType } from './products.action-types';

export const addProductStart = createAction<ProductData>(ActionType.ADD_NEW_PRODUCT_START);

export const fetchProductsStart = createAction(ActionType.FETCH_PRODUCTS_START);

export const setMultipleProducts = createAction<Products>(ActionType.SET_MULTIPLE_PRODUCTS);

export const deleteProductStart = createAction<string>(ActionType.DELETE_PRODUCT_START);
