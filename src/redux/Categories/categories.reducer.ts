import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { CategoryData } from '../../types/interfaces';
import CategoriesActionsCreators from './categories.actions';
import { ProductCategoriesTypes } from '../../types/enums';

const { setMultipleCategories, updateCategory } = CategoriesActionsCreators;

export interface CategoryState {
  categories: CategoryData[];
  category: string;
};

const initialState: CategoryState = {
  categories: [{
    id: 0,
    category: 'Show all',
    type: ProductCategoriesTypes.SECONDARY,
  }],
  category: 'Show all',
};

const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      updateCategory,
      (state, { payload }: PayloadAction<string | undefined>) => ({ ...state, category: payload || 'Show all' }),
    )
    .addCase(
      setMultipleCategories,
      (state, { payload }: PayloadAction<CategoryData[]>) => ({ ...state, categories: initialState.categories.concat(payload) }),
    )
});

export default categoriesReducer;
