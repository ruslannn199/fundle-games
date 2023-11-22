import { createAction } from '@reduxjs/toolkit';
import { CategoryData } from '../../types/interfaces';

export enum ActionType {
  FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  SET_MULTIPLE_CATEGORIES = 'SET_MULTIPLE_CATEGORIES',
}

const CategoriesActionsCreators = {
  fetchCategoriesStart: createAction(ActionType.FETCH_CATEGORIES_START),
  updateCategory: createAction<string>(ActionType.UPDATE_CATEGORY),
  setMultipleCategories: createAction<CategoryData[]>(ActionType.SET_MULTIPLE_CATEGORIES),
}

export default CategoriesActionsCreators;
