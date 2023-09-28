import { createAction } from '@reduxjs/toolkit';

export enum ActionType {
  TOGGLE_LOAD_START = 'TOGGLE_LOAD_START',
}

const LoadingActionCreators = {
  toggleLoadStart: createAction<boolean>(ActionType.TOGGLE_LOAD_START),
}

export default LoadingActionCreators;
