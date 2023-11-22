import { call, put, takeLatest, all } from 'redux-saga/effects';
import { ActionType } from './loading.actions';
import LoadingActionCreators from './loading.actions';

const { addLoadStart, removeLoadStart } = LoadingActionCreators;

const delay = (time: number) => (new Promise((resolve) => (setTimeout(resolve, time))));

export function* setFakeLoading() {
  try {
    yield put(addLoadStart('fakeLoading'));
    yield call(delay, 2000);
    yield put(removeLoadStart('fakeLoading'));
  } catch (err) {
    console.error(err);
    yield put(removeLoadStart('fakeLoading'));
  }
}

export function* onFakeLoadingStart() {
  yield takeLatest(ActionType.SET_FAKE_LOADING, setFakeLoading);
}

export default function* loadingSagas() {
  yield all([
    call(onFakeLoadingStart),
  ]);
}
