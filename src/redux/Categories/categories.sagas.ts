import { all, call, put, takeLatest } from 'redux-saga/effects';
import CategoriesActionsCreators, { ActionType } from './categories.actions';
import { handleFetchCategories } from '../../utils';
import { CategoryData } from '../../types/interfaces';

const { setMultipleCategories } = CategoriesActionsCreators;

export function* fetchCategories() {
  try {
    const categoryData: CategoryData[] = yield handleFetchCategories();
    yield put(setMultipleCategories(categoryData));
  } catch (err) {
    console.error(err);
  }
}

export function* onFetchCategoriesStart() {
  yield takeLatest(ActionType.FETCH_CATEGORIES_START, fetchCategories);
}

export default function* categoriesSagas() {
  yield all([
    call(onFetchCategoriesStart),
  ])
}
