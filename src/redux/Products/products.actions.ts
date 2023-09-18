import type { ProductData, Products } from '../../types/interfaces';
import type { ActionType } from './products.action-types';

export type ProductsAction =
  AddProductStartAction
  | SetProductAction
  | SetMultipleProductsAction;

export interface AddProductStartAction {
  type: ActionType.ADD_NEW_PRODUCT_START;
  payload: ProductData;
}

interface SetProductAction {
  type: ActionType.SET_PRODUCT;
  payload: ProductData | null;
}

interface SetMultipleProductsAction {
  type: ActionType.SET_MULTIPLE_PRODUCTS;
  payload: Products;
}

export interface DeleteProductStartAction {
  type: ActionType.DELETE_PRODUCT_START,
  payload: string;
}
