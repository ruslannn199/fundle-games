import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import loadingReducer from './Loading/loading.reducer';
import categoriesReducer from './Categories/categories.reducer';
import cartReducer from './Cart/cart.reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cartData: cartReducer,
    category: categoriesReducer,
    loader: loadingReducer,
    productsData: productsReducer,
    user: userReducer,
  },
  middleware: [thunk, sagaMiddleware, logger] as const,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
