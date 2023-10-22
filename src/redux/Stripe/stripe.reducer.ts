import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import StripeActionCreators from './stripe.actions';

const { setClient, setPaymentStatus } = StripeActionCreators;

interface StripeState {
  clientSecret: string | null;
  status: string | null;
}

const initialState: StripeState = {
  clientSecret: null,
  status: null,
}

const stripeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      setClient,
      (state, { payload }: PayloadAction<string>) => ({ ...state, clientSecret: payload }),
    )
    .addCase(
      setPaymentStatus,
      (state, { payload }: PayloadAction<string>) => ({ ...state, status: payload }),
    )
});

export default stripeReducer;
