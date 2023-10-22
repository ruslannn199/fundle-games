import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import loadingReducer from './Loading/loading.reducer';
import categoriesReducer from './Categories/categories.reducer';
import cartReducer from './Cart/cart.reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import stripeReducer from './Stripe/stripe.reducer';

const sagaMiddleware = createSagaMiddleware();

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['cartData'],
}

const rootReducer = combineReducers({
  cartData: cartReducer,
  category: categoriesReducer,
  loader: loadingReducer,
  productsData: productsReducer,
  user: userReducer,
  stripe: stripeReducer,
});

export const store = configureStore({
  reducer: persistReducer(configStorage, rootReducer),
  middleware: [thunk, sagaMiddleware] as const,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default {
  store,
  persistor,
};
