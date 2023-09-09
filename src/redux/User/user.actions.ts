import type { ActionType } from '../../types/enums';
import type { CurrentUser, EmailPassword, UserCredentials } from '../../types/interfaces';

export type CurrentUserAction =
  EmailSignInStartAction
  | EmailSignUpStartAction
  | EmailSignOutStartAction
  | GoogleSignInStartAction
  | PasswordRecoveryStartAction
  | GoogleSignInSuccessAction
  | SignInSuccessAction
  | SignOutSuccessAction
  | SignUpSuccessAction
  | PasswordRecoverySuccessAction
  | UserErrorsAction
  | CheckUserSessionAction
  | ResetUserStateAction;

// Start action interfaces
export interface EmailSignInStartAction {
  type: ActionType.EMAIL_SIGN_IN_START;
  payload: EmailPassword;
}

export interface EmailSignUpStartAction {
  type: ActionType.EMAIL_SIGN_UP_START;
  payload: UserCredentials;
}

interface EmailSignOutStartAction {
  type: ActionType.EMAIL_SIGN_OUT_START;
}

interface GoogleSignInStartAction {
  type: ActionType.GOOGLE_SIGN_IN_START;
}

export interface PasswordRecoveryStartAction {
  type: ActionType.PASSWORD_RECOVERY_START;
  payload: string;
}

// Success action interfaces
interface GoogleSignInSuccessAction {
  type: ActionType.GOOGLE_SIGN_IN_SUCCESS;
  payload: CurrentUser | null;
}

interface SignInSuccessAction {
  type: ActionType.SIGN_IN_SUCCESS;
  payload: CurrentUser | null;
}

interface SignOutSuccessAction {
  type: ActionType.SIGN_OUT_SUCCESS;
  payload: CurrentUser | null;
}

interface SignUpSuccessAction {
  type: ActionType.SIGN_UP_SUCCESS;
  payload: CurrentUser | null;
}

interface PasswordRecoverySuccessAction {
  type: ActionType.PASSWORD_RECOVERY_SUCCESS;
  payload: boolean;
}

// Error action interfaces
interface UserErrorsAction {
  type: ActionType.USER_ERROR;
  payload: string[];
}

interface CheckUserSessionAction {
  type: ActionType.CHECK_USER_SESSION;
}

interface ResetUserStateAction {
  type: ActionType.RESET_USER_STATE;
}
