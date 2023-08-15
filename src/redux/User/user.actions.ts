import type { User } from 'firebase/auth';
import { UserTypes } from '../../types/enums';
import type { userMainInfo, userReducerAction } from '../../types/types';

export const setCurrentUser = (user: userMainInfo | User | undefined): userReducerAction => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: user,
});
