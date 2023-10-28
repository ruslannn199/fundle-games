import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Order, StripeClientResponse } from '../../types/interfaces';
import { handleFetchClient } from './stripe.utils';
import LoadingActionCreators from '../Loading/loading.actions';
import StripeActionCreators, { ActionType, ConfirmCardPaymentStartAction, FetchClientStartAction, RetrievePaymentStartAction } from './stripe.actions';
import { PaymentIntentResult } from '@stripe/stripe-js';
import CartActionCreators from '../Cart/cart.actions';
import OrdersActionsCreators from '../Orders/orders.actions';

const { setClient, setPaymentStatus } = StripeActionCreators;
const { clearCartItems } = CartActionCreators;
const { toggleLoadStart } = LoadingActionCreators;
const { saveOrderHistoryStart } = OrdersActionsCreators;

export function* fetchClient({ payload }: FetchClientStartAction) {
  try {
    yield put(toggleLoadStart(true));
    const client: StripeClientResponse = yield handleFetchClient(payload);
    yield put(setClient(client.clientSecret));
    yield put(toggleLoadStart(false));
  } catch (err) {
    console.error(err);
  }
}

export function* retrievePayment({ payload: { stripe, cartData, total } }: RetrievePaymentStartAction) {
  try {
    yield put(toggleLoadStart(true));
    if (stripe) {
      const { clientSecret }: StripeClientResponse = yield handleFetchClient({ cartData, total });
      if (clientSecret) {
        const { paymentIntent, error }: PaymentIntentResult = yield stripe.retrievePaymentIntent(clientSecret);
        if (error) {
          throw error.message;
        } else if (paymentIntent) {
          yield put(setPaymentStatus(paymentIntent.status));
        }
      }
    }
    yield put(toggleLoadStart(false));
  } catch (err) {
    console.error(err);
  }
}

export function* confirmCardPayment({
  payload: { cardPaymentData, stripe, cartData, total }
}: ConfirmCardPaymentStartAction) {
  try {
    yield put(toggleLoadStart(true));
    if (stripe) {
      const { clientSecret }: StripeClientResponse = yield handleFetchClient({ cartData, total });
      yield stripe.confirmCardPayment(
        clientSecret,
        cardPaymentData,
        {
          handleActions: false,
        }
      );
      const configOrder: Order = {
        orderTotal: total,
        orderItems: cartData.map((({ id, thumbnail, productName, price, quantity }) => ({
          id, thumbnail, productName, price, quantity
        }))),
        documentId: crypto.randomUUID(),
      }
      yield put(saveOrderHistoryStart(configOrder));
      yield put(clearCartItems());
    }
    yield put(toggleLoadStart(false));
  } catch (err) {
    console.error(err);
  }
}

export function* onFetchClientStart() {
  yield takeLatest(ActionType.FETCH_CLIENT_START, fetchClient);
}

export function* onRetrievePaymentStart() {
  yield takeLatest(ActionType.RETRIEVE_PAYMENT_START, retrievePayment);
}

export function* onConfirmCardPaymentStart() {
  yield takeLatest(ActionType.CONFIRM_CARD_PAYMENT_START, confirmCardPayment);
}

export default function* stripeSagas() {
  yield all([
    call(onFetchClientStart),
    call(onRetrievePaymentStart),
    call(onConfirmCardPaymentStart),
  ])
}
