import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

export const middleWares = [logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
});

export default store;
