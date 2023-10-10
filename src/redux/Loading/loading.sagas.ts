import { call, put, takeLatest, all } from 'redux-saga/effects';
import { ActionType } from './loading.actions';
import LoadingActionCreators from './loading.actions';

const { toggleLoadStart } = LoadingActionCreators;

const delay = (time: number) => (new Promise((resolve) => (setTimeout(resolve, time))));

export function* setFakeLoading () {
  try {
    yield put(toggleLoadStart(true));
    yield call(delay, 2000);
    yield put(toggleLoadStart(false));
  } catch (err) {
    console.error(err);
  }
}

export function* onFakeLoadingStart() {
  yield takeLatest(ActionType.SET_FAKE_LOADING, setFakeLoading);
}

export default function* loadingSagas() {
  yield all([
    call(onFakeLoadingStart)
  ]);
}
