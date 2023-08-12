import { UserTypes } from '../../types/enums';
import type { User } from 'firebase/auth';
import type { userReducerAction } from '../../types/types';

export const setCurrentUser = (user: User | null): userReducerAction => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: user,
});
