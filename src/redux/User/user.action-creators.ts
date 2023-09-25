import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/enums';
import type { CurrentUser, EmailPassword, UserCredentials } from '../../types/interfaces';

// Start action creators

export const emailSignInStart = createAction<EmailPassword>(ActionType.EMAIL_SIGN_IN_START);

export const emailSignOutStart = createAction(ActionType.EMAIL_SIGN_OUT_START);

export const emailSignUpStart = createAction<UserCredentials>(ActionType.EMAIL_SIGN_UP_START);

export const recoverPasswordStart = createAction<string>(ActionType.PASSWORD_RECOVERY_START);

export const googleSignInStart = createAction(ActionType.GOOGLE_SIGN_IN_START);

// Success action creators
export const signInSuccess = createAction<CurrentUser | null>(ActionType.SIGN_IN_SUCCESS);

export const signOutSuccess = createAction<null>(ActionType.SIGN_OUT_SUCCESS);

export const signUpSuccess = createAction<CurrentUser | null>(ActionType.SIGN_UP_SUCCESS);

export const recoverPasswordSuccess = createAction<true>(ActionType.PASSWORD_RECOVERY_SUCCESS);

export const googleSignSuccess = createAction<CurrentUser | null>(ActionType.GOOGLE_SIGN_IN_SUCCESS);

// Error action creators
export const userError = createAction<string[]>(ActionType.USER_ERROR);

// Other
export const checkUserSession = createAction(ActionType.CHECK_USER_SESSION);

export const resetUserState = createAction(ActionType.RESET_USER_STATE);
