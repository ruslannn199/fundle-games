import { createAction } from '@reduxjs/toolkit';
import { ConfirmCardPaymentActionPayload, FetchClientActionPayload, ProductData, RetrievePaymentActionPayload } from '../../types/interfaces';

export enum ActionType {
  CONFIRM_CARD_PAYMENT_START = 'CONFIRM_CARD_PAYMENT_START',
  FETCH_CLIENT_START = 'FETCH_CLIENT_START',
  SET_CLIENT = 'SET_CLIENT',
  SET_PAYMENT_STATUS = 'SET_PAYMENT_STATUS',
  RETRIEVE_PAYMENT_START = 'RETRIEVE_PAYMENT_START',
}

export interface FetchClientStartAction {
  type: ActionType.FETCH_CLIENT_START;
  payload: FetchClientActionPayload;
}

export interface RetrievePaymentStartAction {
  type: ActionType.RETRIEVE_PAYMENT_START;
  payload: RetrievePaymentActionPayload;
}

export interface ConfirmCardPaymentStartAction {
  type: ActionType.CONFIRM_CARD_PAYMENT_START;
  payload: ConfirmCardPaymentActionPayload;
}

const StripeActionCreators = {
  confirmCardPaymentStart: createAction<ConfirmCardPaymentActionPayload>(ActionType.CONFIRM_CARD_PAYMENT_START),
  fetchClientStart: createAction<FetchClientActionPayload>(ActionType.FETCH_CLIENT_START),
  retrievePaymentStart: createAction<RetrievePaymentActionPayload>(ActionType.RETRIEVE_PAYMENT_START),
  setClient: createAction<string>(ActionType.SET_CLIENT),
  setPaymentStatus: createAction<string>(ActionType.SET_PAYMENT_STATUS),
}

export default StripeActionCreators;
