import { all, call, put, takeLatest } from 'redux-saga/effects';
import OrdersActionsCreators, { ActionType, GetUserOrderHistoryStartAction, SaveOrderHistoryStartAction } from './orders.actions';
import { handleGetUserOrderHistory, handleSaveOrder } from './orders.utils';
import { auth } from '../../utils/firebase.utils';
import { convertToMySQLDateTime } from '../../utils';
import LoadingActionCreators from '../Loading/loading.actions';
import { Order } from '../../types/interfaces';

const { toggleLoadStart } = LoadingActionCreators;
const { setUserOrderHistory } = OrdersActionsCreators;

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

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ActionType.SAVE_ORDER_HISTORY_START, saveOrderHistory);
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(ActionType.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
  ]);
}
