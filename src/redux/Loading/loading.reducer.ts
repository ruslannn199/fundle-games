import { createReducer } from '@reduxjs/toolkit';
import LoadingActionCreators from './loading.actions';

const loadingReducer = createReducer({ isLoading: true }, (builder) => {
  builder.addCase(
    LoadingActionCreators.toggleLoadStart,
    (state, { payload }) => ({ isLoading: payload }),
  )
});

export default loadingReducer;
