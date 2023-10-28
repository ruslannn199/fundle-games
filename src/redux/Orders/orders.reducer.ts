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
      (state, { payload }: PayloadAction<Order[]>) => ({ ...state, orderHistory: payload.toSorted((a, b) => {
        if (a.orderCreatedDate && b.orderCreatedDate) {
          if (a.orderCreatedDate < b.orderCreatedDate) {
            return 1;
          } else if (a.orderCreatedDate > b.orderCreatedDate) {
            return -1;
          }
        }
        return 0;
      }) }),
    )
    .addCase(
      setOrderDetails,
      (state, { payload }: PayloadAction<Order | null>) => ({ ...state, orderDetails: payload }),
    )
});

export default ordersReducer;
