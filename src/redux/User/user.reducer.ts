import { UserTypes } from '../../types/enums';
import { userReducerAction, userState } from '../../types/types';

const INITIAL_STATE = {
  currentUser: undefined,
};

const userReducer = (state: Record<'currentUser', userState> = INITIAL_STATE, action: userReducerAction) => {
  switch(action.type) {
    case UserTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
