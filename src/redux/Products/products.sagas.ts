import { takeLatest, put, all, call } from 'redux-saga/effects';
import { AddProductStartAction, DeleteProductStartAction, FetchProductStartAction, FetchProductsStartAction } from './products.actions';
import { auth } from '../../utils/firebase.utils';
import type { ProductData, Products } from '../../types/interfaces';
import { handleAddProduct, handleDeleteProducts, handleFetchProducts } from './products.utils';
import ProductsActionCreators from './products.actions';
import LoadingActionCreators from '../Loading/loading.actions';
import { ActionType } from './products.actions';
import { convertToMySQLDateTime } from '../../utils';
import { handleFetchProduct } from './products.utils';
import { redirect } from 'react-router-dom';

const { fetchProductsStart, setProduct, setMultipleProducts } = ProductsActionCreators;
const { addLoadStart, removeLoadStart } = LoadingActionCreators;

export function* addProduct({ payload }: AddProductStartAction) {
  try {
    const timeStamp = convertToMySQLDateTime(new Date());
    if (auth.currentUser) {
      yield put(addLoadStart('addProduct'));

      yield handleAddProduct({
        ...payload,
        id: crypto.randomUUID(),
        productAdminUserID: auth.currentUser.uid,
        createdDate: timeStamp,
      });

      yield put(fetchProductsStart({
        filters: {
          currentPage: 1,
        },
        pageSize: 50,
      }));
      yield put(removeLoadStart('addProduct'));
    }
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    yield put(removeLoadStart('addProduct'));
  }
}

export function* fetchProducts({ payload }: FetchProductsStartAction) {
  try {
    yield put(addLoadStart('fetchProducts'));
    const productData: Products = yield handleFetchProducts(payload);
    yield put(setMultipleProducts(productData));
    yield put(removeLoadStart('fetchProducts'));
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    yield put(removeLoadStart('fetchProducts'));
  }
}

export function* fetchProduct({ payload }: FetchProductStartAction) {
  try {
    yield put(addLoadStart('fetchProduct'));
    const product: ProductData = yield handleFetchProduct(payload);
    yield put(setProduct(product));
    yield put(removeLoadStart('fetchProduct'));
  } catch {
    yield put(removeLoadStart('fetchProduct'));
    redirect('/404');
  }
}

export function* deleteProduct({ payload }: DeleteProductStartAction) {
  try {
    if (payload) {
      yield put(addLoadStart('deleteProduct'));
      yield handleDeleteProducts(payload);
      yield put(fetchProductsStart({
        filters: {
          currentPage: 1,
        },
        pageSize: 50,
      }));
      yield put(removeLoadStart('deleteProduct'));
    }
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    yield put(removeLoadStart('deleteProduct'));
  }
}

export function* onAddProductStart() {
  yield takeLatest(ActionType.ADD_NEW_PRODUCT_START, addProduct);
}

export function* onFetchProductsStart() {
  yield takeLatest(ActionType.FETCH_PRODUCTS_START, fetchProducts);
}

export function* onFetchProductStart() {
  yield takeLatest(ActionType.FETCH_PRODUCT_START, fetchProduct);
}

export function* onDeleteProductStart() {
  yield takeLatest(ActionType.DELETE_PRODUCT_START, deleteProduct);
}

// Global saga
export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onFetchProductStart),
    call(onDeleteProductStart),
  ]);
}
