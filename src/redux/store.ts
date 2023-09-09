import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import userReducer, { type UserState } from './User/user.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
export const middleWares = [thunk, sagaMiddleware, logger];

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: middleWares,
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const mapStateToProps = ({ currentUser }: UserState) => ({ currentUser });
