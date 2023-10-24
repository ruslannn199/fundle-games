import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { Order } from '../../types/interfaces';
import OrdersActionsCreators from './orders.actions';

const { setUserOrderHistory } = OrdersActionsCreators;

interface OrdersState {
  orderHistory: Order[];
  orderDetails: Order | null;
}

const initialState: OrdersState = {
  orderHistory: [],
  orderDetails: null,
}

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      setUserOrderHistory,
      (state, { payload }: PayloadAction<Order[]>) => ({ ...state, orderHistory: payload }),
    )
});

export default ordersReducer;
