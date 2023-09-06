import { ActionType } from '../../types/enums';
import type { User } from 'firebase/auth';
import type { userMainInfo } from '../../types/types';
import type { currentUserAction } from './user.action-types';

export const signInUser = (user: userMainInfo | User | undefined): currentUserAction => ({
  type: ActionType.SIGN_IN_SUCCESS,
  payload: user,
});

export const userError = (err: string[]) => ({
  type: ActionType.USER_ERROR,
  payload: err,
});
