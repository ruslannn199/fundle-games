import { ActionType } from '../../types/enums';
import { currentUser } from '../../types/types';


export type currentUserAction =
  signInSuccessAction
  | userErrorsAction;

export type signInSuccessAction = {
  type: ActionType.SIGN_IN_SUCCESS;
  payload: currentUser | null;
}

export type userErrorsAction = {
  type: ActionType.USER_ERROR;
  payload: string[];
}