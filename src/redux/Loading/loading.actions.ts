import { createAction } from '@reduxjs/toolkit';

export enum ActionType {
  ADD_LOAD_START = 'ADD_LOAD_START',
  REMOVE_LOADING_START = 'REMOVE_LOADING_START',
  SET_FAKE_LOADING = 'SET_FAKE_LOADING',
}

const LoadingActionCreators = {
  setFakeLoadingStart: createAction(ActionType.SET_FAKE_LOADING),
  addLoadStart: createAction<string>(ActionType.ADD_LOAD_START),
  removeLoadStart: createAction<string>(ActionType.REMOVE_LOADING_START),
}

export default LoadingActionCreators;
