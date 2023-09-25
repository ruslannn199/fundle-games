import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ActionType } from '../../types/enums';
import { CurrentUser } from '../../types/interfaces';
import { recoverPasswordSuccess, signInSuccess, userError } from './user.action-creators';

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

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      signInSuccess,
      (state, { payload }: PayloadAction<CurrentUser | null>) => ({
        ...state,
        currentUser: payload,
        userErrors: [],
      }),
    )
    .addCase(
      userError,
      (state, { payload }: PayloadAction<string[]>) => ({ ...state, userErrors: payload }),
    )
    .addCase(
      recoverPasswordSuccess,
      (state, { payload }: PayloadAction<boolean>) => ({ ...state, recoverPasswordSuccess: payload }),
    )
    .addMatcher(
      (action) =>
        (action.type === ActionType.RESET_USER_STATE || action.type === ActionType.SIGN_OUT_SUCCESS),
        (state) => ({ ...state, ...initialState }),
    )
});

export default userReducer;
