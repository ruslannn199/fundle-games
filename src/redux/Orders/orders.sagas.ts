import { all, call, put, takeLatest } from 'redux-saga/effects';
import OrdersActionsCreators, { ActionType, GetOrderDetailsStartAction, GetUserOrderHistoryStartAction, PaymentStartAction, SaveOrderHistoryStartAction } from './orders.actions';
import { handleGetOrderDetails, handleGetUserOrderHistory, handleSaveOrder } from './orders.utils';
import { auth } from '../../utils/firebase.utils';
import { convertToMySQLDateTime } from '../../utils';
import LoadingActionCreators from '../Loading/loading.actions';
import { Order } from '../../types/interfaces';
import CartActionCreators from '../Cart/cart.actions';

const { addLoadStart, removeLoadStart } = LoadingActionCreators;
const { setUserOrderHistory, setOrderDetails, saveOrderHistoryStart } = OrdersActionsCreators;
const { clearCartItems } = CartActionCreators;

export function* saveOrderHistory({ payload }: SaveOrderHistoryStartAction) {
  try {
    yield put(addLoadStart('saveOrderHistory'));
    const timestamp = convertToMySQLDateTime(new Date());
    yield handleSaveOrder({
      ...payload,
      orderUserId: auth.currentUser?.uid || crypto.randomUUID(),
      orderCreatedDate: timestamp,
    });
    yield put(removeLoadStart('saveOrderHistory'));
  } catch (err) {
    console.error(err);
    yield put(removeLoadStart('saveOrderHistory'));
  }
}

export function* makePaymentStart({
  payload: { cartData, total, success }
}: PaymentStartAction) {
  try {
    yield put(addLoadStart('confirmCardPayment'));
    if (success) {
      const configOrder: Order = {
        orderTotal: total,
        orderItems: cartData.map((({ id, thumbnail, productName, price, quantity }) => ({
          id, thumbnail, productName, price, quantity
        }))),
        documentId: crypto.randomUUID(),
      }
      yield put(saveOrderHistoryStart(configOrder));
      yield put(clearCartItems());
    } else {
      throw new Error('Payment error');
    }
  } catch (err) {
    console.error(err);
  } finally {
    yield put(removeLoadStart('confirmCardPayment'));
  }
}

export function* getUserOrderHistory({ payload }: GetUserOrderHistoryStartAction) {
  try {
    yield put(addLoadStart('getOrderHistory'));
    const history: Order[] = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
    yield put(removeLoadStart('getOrderHistory'));
  } catch (err) {
    console.error(err);
    yield put(removeLoadStart('getOrderHistory'));
  }
}

export function* getOrderDetails({ payload }: GetOrderDetailsStartAction) {
  try {
    yield put(addLoadStart('getOrderDetails'));
    const order: Order = yield handleGetOrderDetails(payload);
    yield put(setOrderDetails(order));
    yield put(removeLoadStart('getOrderDetails'));
  } catch (err) {
    console.error(err);
    yield put(removeLoadStart('getOrderDetails'));
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ActionType.SAVE_ORDER_HISTORY_START, saveOrderHistory);
}

export function* onMakePaymentStart() {
  yield takeLatest(ActionType.MAKE_PAYMENT_START, makePaymentStart);
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(ActionType.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ActionType.GET_ORDER_DETAILS_START, getOrderDetails);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onMakePaymentStart),
  ]);
}
