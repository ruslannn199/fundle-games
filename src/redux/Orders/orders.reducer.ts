import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { Order } from '../../types/interfaces';
import OrdersActionsCreators from './orders.actions';

const { setUserOrderHistory, setOrderDetails } = OrdersActionsCreators;

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
    .addCase(
      setOrderDetails,
      (state, { payload }: PayloadAction<Order>) => ({ ...state, orderDetails: payload }),
    )
});

export default ordersReducer;
