import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ProductData, Products } from '../../types/interfaces'
import ProductsActionCreators from './products.actions';
import LoadingActionCreators from '../Loading/loading.actions';

const { addProductStart, setMultipleProducts } = ProductsActionCreators;
const { toggleLoadStart } = LoadingActionCreators;

export interface ProductsState {
  products: Products;
  product: ProductData | null;
}

const initialState: ProductsState = {
  products: {
    data: [],
    isLastPage: false,
  },
  product: null,
}

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      addProductStart,
      (state, { payload }: PayloadAction<ProductData>) => ({ ...state, product: payload }),
    )
    .addCase(
      setMultipleProducts,
      (state, { payload }: PayloadAction<Products>) => ({ ...state, products: payload }),
    )
});

export default productsReducer;
