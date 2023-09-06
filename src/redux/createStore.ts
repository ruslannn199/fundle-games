import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

export const middleWares = [thunk, logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
});

export default store;
