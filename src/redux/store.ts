import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import loadingReducer from './Loading/loading.reducer';
import categoriesReducer from './Categories/categories.reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    productsData: productsReducer,
    loader: loadingReducer,
    category: categoriesReducer,
  },
  middleware: [thunk, sagaMiddleware] as const,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
