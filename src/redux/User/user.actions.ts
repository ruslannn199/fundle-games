import { createAction } from '@reduxjs/toolkit';
import type { CurrentUser, EmailPassword, UserCredentials } from '../../types/interfaces';

export enum ActionType {
  // Start actions
  EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START',
  EMAIL_SIGN_UP_START = 'EMAIL_SIGN_UP_START',
  EMAIL_SIGN_OUT_START = 'EMAIL_SIGN_OUT_START',
  GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START',
  PASSWORD_RECOVERY_START = 'PASSWORD_RECOVERY_START',
  FETCH_CLIENT_START = 'FETCH_CLIENT_START',
  SET_CLIENT = 'SET_CLIENT',
  // Success actions
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  PASSWORD_RECOVERY_SUCCESS = 'PASSWORD_RECOVERY_SUCCESS',
  // Error
  USER_ERROR = 'USER_ERROR',
  // Other
  CHECK_USER_SESSION = 'CHECK_USER_SESSION',
  RESET_USER_STATE = 'RESET_USER_STATE',
}

export interface EmailSignInStartAction {
  type: ActionType.EMAIL_SIGN_IN_START;
  payload: EmailPassword;
}

export interface EmailSignUpStartAction {
  type: ActionType.EMAIL_SIGN_UP_START;
  payload: UserCredentials;
}

export interface PasswordRecoveryStartAction {
  type: ActionType.PASSWORD_RECOVERY_START;
  payload: string;
}

const UserActionCreators = {
  // Start action creators
  emailSignInStart: createAction<EmailPassword>(ActionType.EMAIL_SIGN_IN_START),
  emailSignOutStart: createAction(ActionType.EMAIL_SIGN_OUT_START),
  emailSignUpStart: createAction<UserCredentials>(ActionType.EMAIL_SIGN_UP_START),
  recoverPasswordStart: createAction<string>(ActionType.PASSWORD_RECOVERY_START),
  googleSignInStart: createAction(ActionType.GOOGLE_SIGN_IN_START),
  fetchClientStart: createAction(ActionType.FETCH_CLIENT_START),
  setClient: createAction<string>(ActionType.SET_CLIENT),
  // Success action creators
  signInSuccess: createAction<CurrentUser | null>(ActionType.SIGN_IN_SUCCESS),
  signOutSuccess: createAction<null>(ActionType.SIGN_OUT_SUCCESS),
  signUpSuccess: createAction<CurrentUser | null>(ActionType.SIGN_UP_SUCCESS),
  recoverPasswordSuccess: createAction<true>(ActionType.PASSWORD_RECOVERY_SUCCESS),
  googleSignSuccess: createAction<CurrentUser | null>(ActionType.GOOGLE_SIGN_IN_SUCCESS),
  // Error action creators
  userError: createAction<string[]>(ActionType.USER_ERROR),
  // Other
  checkUserSession: createAction(ActionType.CHECK_USER_SESSION),
  resetUserState: createAction(ActionType.RESET_USER_STATE),
}

export default UserActionCreators;
