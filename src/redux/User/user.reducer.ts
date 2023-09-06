import { ActionType } from '../../types/enums';
import { userState } from '../../types/types';
import { currentUserAction } from './user.action-types';

const INITIAL_STATE: userState = {
  currentUser: null,
  userErrors: [],
};

const userReducer = (
  state = INITIAL_STATE,
  action: currentUserAction
  ): userState => {
  switch(action.type) {
    case ActionType.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionType.USER_ERROR:
      return {
        ...state,
        userErrors: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
