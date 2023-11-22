import { createAction } from '@reduxjs/toolkit';
import { Order, PaymentActionPayload } from '../../types/interfaces';

export enum ActionType {
  MAKE_PAYMENT_START = 'MAKE_PAYMENT_START',
  SAVE_ORDER_HISTORY_START = 'SAVE_ORDER_HISTORY_START',
  GET_USER_ORDER_HISTORY_START = 'GET_USER_ORDER_HISTORY_START',
  SET_USER_ORDER_HISTORY = 'SET_USER_ORDER_HISTORY',
  GET_ORDER_DETAILS_START = 'GET_ORDER_DETAILS_START',
  SET_ORDER_DETAILS = 'SET_ORDER_DETAILS',
}

export interface SaveOrderHistoryStartAction {
  type: ActionType.SAVE_ORDER_HISTORY_START;
  payload: Order;
}

export interface PaymentStartAction {
  type: ActionType.MAKE_PAYMENT_START;
  payload: PaymentActionPayload;
}

export interface GetUserOrderHistoryStartAction {
  type: ActionType.GET_USER_ORDER_HISTORY_START;
  payload: string;
}

export interface GetOrderDetailsStartAction {
  type: ActionType.GET_ORDER_DETAILS_START;
  payload: string;
}

const OrdersActionsCreators = {
  saveOrderHistoryStart: createAction<Order>(ActionType.SAVE_ORDER_HISTORY_START),
  makePaymentStart: createAction<PaymentActionPayload>(ActionType.MAKE_PAYMENT_START),
  getOrderDetailsStart: createAction<string>(ActionType.GET_ORDER_DETAILS_START),
  getUserOrderHistoryStart: createAction<string>(ActionType.GET_USER_ORDER_HISTORY_START),
  setOrderDetails: createAction<Order | null>(ActionType.SET_ORDER_DETAILS),
  setUserOrderHistory: createAction<Order[]>(ActionType.SET_USER_ORDER_HISTORY),
}

export default OrdersActionsCreators;
