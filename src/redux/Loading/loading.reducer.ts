import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import LoadingActionCreators from './loading.actions';

const { addLoadStart, removeLoadStart } = LoadingActionCreators;

interface LoadingState {
  loadingQueue: string[];
}

const initialState: LoadingState = {
  loadingQueue: [],
}

const loadingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      addLoadStart,
      (state, { payload }: PayloadAction<string>) => {
        return { ...state, loadingQueue: [ ...state.loadingQueue, payload ] };
      }
    )
    .addCase(
      removeLoadStart,
      (state, { payload }: PayloadAction<string>) => {
        const deletingIndex = state.loadingQueue.findIndex((element) => (element === payload));
        const newLoadingQueue = state.loadingQueue.slice(0, deletingIndex);
        return { ...state, loadingQueue: newLoadingQueue };
      }
    )
});

export default loadingReducer;
