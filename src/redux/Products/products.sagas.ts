import { takeLatest, put, all, call } from 'redux-saga/effects';
import { AddProductStartAction, DeleteProductStartAction } from './products.actions';
import { auth } from '../../utils/firebase.utils';
import type { ProductData } from '../../types/interfaces';
import { handleAddProduct, handleDeleteProducts, handleFetchProducts } from '../../utils';
import ProductsActionCreators from './products.actions';
import LoadingActionCreators from '../Loading/loading.actions';
import { ActionType } from './products.actions';
import { convertToMySQLDateTime } from '../../utils';

const { fetchProductsStart, setMultipleProducts } = ProductsActionCreators;
const { toggleLoadStart } = LoadingActionCreators;

export function* addProduct({ payload }: AddProductStartAction) {
  try {
    const timeStamp = convertToMySQLDateTime(new Date());
    if (auth.currentUser) {
      yield put(toggleLoadStart(true));

      yield handleAddProduct({
        ...payload,
        productAdminUserID: auth.currentUser.uid,
        createdDate: timeStamp,
      });

      yield put(fetchProductsStart());
    }
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

export function* fetchProducts() {
  try {
    yield put(toggleLoadStart(true));
    const productDataArr: ProductData[] = yield handleFetchProducts();
    yield put(setMultipleProducts({
      data: productDataArr,
      isLastPage: false,
    }));
    yield put(toggleLoadStart(false));
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

export function* deleteProduct({ payload }: DeleteProductStartAction) {
  try {
    if (payload) {
      yield put(toggleLoadStart(true));
      yield handleDeleteProducts(payload);
      yield put(fetchProductsStart());
    }
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

export function* onAddProductStart() {
  yield takeLatest(ActionType.ADD_NEW_PRODUCT_START, addProduct);
}

export function* onFetchProductsStart() {
  yield takeLatest(ActionType.FETCH_PRODUCTS_START, fetchProducts);
}

export function* onDeleteProductStart() {
  yield takeLatest(ActionType.DELETE_PRODUCT_START, deleteProduct);
}

// Global saga
export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ]);
}
