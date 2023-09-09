import { ActionType } from '../../types/enums';
import { CurrentUser } from '../../types/interfaces';
import { CurrentUserAction } from './user.actions';

// State interface
export interface UserState {
  currentUser: CurrentUser | null;
  userErrors: string[];
  recoverPasswordSuccess: boolean;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  userErrors: [],
  recoverPasswordSuccess: false,
}

const userReducer = (
  state = initialState,
  action: CurrentUserAction
  ): UserState => {
  switch(action.type) {
    case ActionType.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErrors: [],
      };
    case ActionType.RESET_USER_STATE:
    case ActionType.SIGN_OUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      }
    case ActionType.USER_ERROR:
      return {
        ...state,
        userErrors: action.payload,
      };
    case ActionType.PASSWORD_RECOVERY_SUCCESS:
      return {
        ...state,
        recoverPasswordSuccess: action.payload,
      }
    default:
      return state;
  }
}

export default userReducer;
