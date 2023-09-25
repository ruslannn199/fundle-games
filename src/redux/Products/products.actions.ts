import type { ProductData } from '../../types/interfaces';
import type { ActionType } from './products.action-types';

export interface AddProductStartAction {
  type: ActionType.ADD_NEW_PRODUCT_START;
  payload: ProductData;
}

export interface DeleteProductStartAction {
  type: ActionType.DELETE_PRODUCT_START,
  payload: string;
}
