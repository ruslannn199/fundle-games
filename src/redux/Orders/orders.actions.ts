import { createAction } from '@reduxjs/toolkit';
import { Order } from '../../types/interfaces';

export enum ActionType {
  SAVE_ORDER_HISTORY_START = 'SAVE_ORDER_HISTORY_START',
  GET_USER_ORDER_HISTORY_START = 'GET_USER_ORDER_HISTORY_START',
  SET_USER_ORDER_HISTORY = 'SET_USER_ORDER_HISTORY',
}

export interface SaveOrderHistoryStartAction {
  type: ActionType.SAVE_ORDER_HISTORY_START;
  payload: Order;
}

export interface GetUserOrderHistoryStartAction {
  type: ActionType.GET_USER_ORDER_HISTORY_START;
  payload: string;
}

const OrdersActionsCreators = {
  saveOrderHistoryStart: createAction<Order>(ActionType.SAVE_ORDER_HISTORY_START),
  getUserOrderHistoryStart: createAction<string>(ActionType.GET_USER_ORDER_HISTORY_START),
  setUserOrderHistory: createAction<Order[]>(ActionType.SET_USER_ORDER_HISTORY),
}

export default OrdersActionsCreators;
