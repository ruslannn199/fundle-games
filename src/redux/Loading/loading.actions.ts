import { createAction } from '@reduxjs/toolkit';

export enum ActionType {
  TOGGLE_LOAD_START = 'TOGGLE_LOAD_START',
  SET_FAKE_LOADING = 'SET_FAKE_LOADING',
}

const LoadingActionCreators = {
  toggleLoadStart: createAction<boolean>(ActionType.TOGGLE_LOAD_START),
  setFakeLoadingStart: createAction(ActionType.SET_FAKE_LOADING),
}

export default LoadingActionCreators;
