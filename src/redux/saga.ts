import { all, call } from 'redux-saga/effects';
import userSagas from './User/user.sagas';
import productsSagas from './Products/products.sagas';
import loadingSagas from './Loading/loading.sagas';
import categoriesSagas from './Categories/categories.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(productsSagas),
    call(loadingSagas),
    call(categoriesSagas),
  ]);
}
