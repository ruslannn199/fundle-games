import { all, call, put, takeLatest } from 'redux-saga/effects';
import OrdersActionsCreators, { ActionType, GetOrderDetailsStartAction, GetUserOrderHistoryStartAction, SaveOrderHistoryStartAction } from './orders.actions';
import { handleGetOrderDetails, handleGetUserOrderHistory, handleSaveOrder } from './orders.utils';
import { auth } from '../../utils/firebase.utils';
import { convertToMySQLDateTime } from '../../utils';
import LoadingActionCreators from '../Loading/loading.actions';
import { Order } from '../../types/interfaces';

const { toggleLoadStart } = LoadingActionCreators;
const { setUserOrderHistory, setOrderDetails } = OrdersActionsCreators;

export function* saveOrderHistory({ payload }: SaveOrderHistoryStartAction) {
  try {
    yield put(toggleLoadStart(true));
    const timestamp = convertToMySQLDateTime(new Date());
    yield handleSaveOrder({
      ...payload,
      orderUserId: auth.currentUser?.uid || crypto.randomUUID(),
      orderCreatedDate: timestamp,
    });
    yield put(toggleLoadStart(false));
  } catch (err) {
    console.error(err);
  }
}

export function* getUserOrderHistory({ payload }: GetUserOrderHistoryStartAction) {
  try {
    yield put(toggleLoadStart(true));
    const history: Order[] = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
    yield put(toggleLoadStart(false));
  } catch (err) {
    console.error(err);
  }
}

export function* getOrderDetails({ payload }: GetOrderDetailsStartAction) {
  try {
    yield put(toggleLoadStart(true));
    const order: Order = yield handleGetOrderDetails(payload);
    yield put(setOrderDetails(order));
    yield put(toggleLoadStart(false));
  } catch (err) {
    console.error(err);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ActionType.SAVE_ORDER_HISTORY_START, saveOrderHistory);
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
  ]);
}
