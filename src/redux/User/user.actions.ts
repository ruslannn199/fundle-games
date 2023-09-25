import type { ActionType } from '../../types/enums';
import type { EmailPassword, UserCredentials } from '../../types/interfaces';

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
